"use server";
import { setupScriptFormSchema } from "@/components/pages/dashboard/SetupScript/Form";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { z } from "zod";

export async function editSetupScript(
    data: z.infer<typeof setupScriptFormSchema>,
    scriptId?: string,
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        unauthorized();
    }
    await db
        .update(setupScript)
        .set({
            name: data.name,
            description: data.description,
            script: data.script,
        })
        .where(
            and(
                eq(setupScript.id, scriptId as string),
                eq(setupScript.authorId, session.user.id as string),
            ),
        );
}
