"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";
import { headers } from "next/headers";
import { plans } from "@/data/config.json";
import { cidrToIpList } from "@/lib/ipCalc";

function generatePassword(length: number): string {
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

export async function createServer(name: string, type: string, os: string) {
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
    const [ipList, prefix] = cidrToIpList("192.168.122.0/24");
    const usedIPs = existingIP.map((item) => item.ip);
    const gateway = "192.168.122.1";
    const unusedIPs = ipList.filter(
        (ip) => !usedIPs.includes(ip) && ip !== `${gateway}/${prefix}`,
    );
    const address = unusedIPs.shift();
    if (!address) {
        throw new Error("No available IP addresses");
    }
    const plan = plans.find((plan) => plan.id === parseInt(type));
    const res = await fetch(`${process.env.VM_CONTROLLER_ENDPOINT}/domains`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: generatePassword(16),
            network: {
                address: address,
                gateway: gateway,
            },
            resources: {
                cpu: plan?.resource.cpu,
                memory: (plan?.resource.memory || 1024) / 1024,
                disk: `${plan?.resource.disk}G`,
            },
        }),
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
