"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";
import { headers } from "next/headers";

export async function createServer(name: string, type: string, os: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const id = crypto.randomUUID();
    const serverData: typeof server.$inferInsert = {
        id,
        name,
        ip: "192.168.1.0/24",
        os,
        type: parseInt(type),
        authorId: session?.user.id as string,
    };
    await db.insert(server).values(serverData);
}
