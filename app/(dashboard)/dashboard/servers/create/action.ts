"use server";

import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";

export async function createServer(name: string, type: string, os: string) {
    const id = crypto.randomUUID();
    console.log(id);
    const serverData: typeof server.$inferInsert = {
        id,
        name,
        ip: "192.168.1.0/24",
        os,
        type: parseInt(type),
    };
    await db.insert(server).values(serverData);
}
