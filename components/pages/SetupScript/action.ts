"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

export async function deleteScript(scriptId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        unauthorized();
    }
    try {
        await db
            .delete(setupScript)
            .where(
                and(
                    eq(setupScript.id, scriptId),
                    eq(setupScript.authorId, session.user.id),
                ),
            );
        return { success: true };
    } catch (error) {
        console.error("Error deleting script:", error);
        return { success: false, error: "Failed to delete script" };
    }
}
