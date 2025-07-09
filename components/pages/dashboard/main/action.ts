"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

export async function shutdownServer(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Unauthorized");
    }
    const exists = await db
        .select()
        .from(server)
        .where(and(eq(server.id, id), eq(server.authorId, session.user.id)));
    if (exists.length === 0) {
        throw new Error("Server not found or unauthorized");
    }
    const res = await fetch(
        `${process.env.VM_CONTROLLER_ENDPOINT}/domains/${id}/shutdown`,
        {
            method: "POST",
        },
    );
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to shutdown server");
    }
}

export async function deleteServer(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Unauthorized");
    }
    const res = await fetch(
        `${process.env.VM_CONTROLLER_ENDPOINT}/domains/${id}`,
        {
            method: "DELETE",
        },
    );
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete server");
    }
    // Delete server from the database
    await db
        .delete(server)
        .where(and(eq(server.id, id), eq(server.authorId, session.user.id)));
}
