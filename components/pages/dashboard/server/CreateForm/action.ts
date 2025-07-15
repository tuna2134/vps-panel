"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";
import { headers } from "next/headers";
import { plans } from "@/data/config.json";
import { cidrToIpList } from "@/lib/ipCalc";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { eq } from "drizzle-orm";

interface CreateServerPayload {
    password: string;
    network: {
        address: string;
        gateway: string;
        interface: string;
    };
    resources: {
        cpu: number;
        memory: number;
        disk: string;
    };
    script?: string;
}

export async function createServer(
    name: string,
    type: string,
    os: string,
    password: string,
    setupScriptId?: string,
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    const existingIP = await db
        .select({
            ip: server.ip,
        })
        .from(server);
    const [ipList, prefix] = cidrToIpList(
        process.env.NETWORK_CIDR || "192.168.122.0/24",
    );
    const usedIPs = existingIP.map((item) => item.ip);
    const gateway = process.env.NETWORK_GATEWAY || "192.168.122.1";
    const unusedIPs = ipList.filter(
        (ip) => !usedIPs.includes(ip) && ip !== `${gateway}/${prefix}`,
    );
    const address = unusedIPs.shift();
    if (!address) {
        throw new Error("No available IP addresses");
    }
    const plan = plans.find((plan) => plan.id === parseInt(type));
    const payload: CreateServerPayload = {
        password: password,
        network: {
            address: address,
            gateway: gateway,
            interface: process.env.NETWORK_INTERFACE || "vmbr0",
        },
        resources: {
            cpu: plan?.resource.cpu as number,
            memory: (plan?.resource.memory || 1024) / 1024,
            disk: `${plan?.resource.disk}G`,
        },
    };
    if (setupScriptId) {
        const script = (await db
            .select({
                script: setupScript.script,
            })
            .from(setupScript)
            .where(eq(setupScript.id, setupScriptId))) as { script: string }[];
        if (script) {
            payload.script = script[0].script;
        }
    }
    const res = await fetch(`${process.env.VM_CONTROLLER_ENDPOINT}/domains`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to create server");
    }
    const serverData: typeof server.$inferInsert = {
        id: data.id,
        name,
        ip: address,
        os,
        type: parseInt(type),
        authorId: session?.user.id as string,
    };
    await db.insert(server).values(serverData);
}
