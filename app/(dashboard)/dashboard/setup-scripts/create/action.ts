"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { headers } from "next/headers";

export async function createSetupScript(
    id: string,
    title: string,
    description: string,
    script: string,
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    await db.insert(setupScript).values({
        id,
        name: title,
        description,
        script,
        authorId: session.user.id as string,
    });
}
