"use server";

import { setupScriptFormSchema } from "@/components/pages/dashboard/SetupScript/Form";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { headers } from "next/headers";
import { z } from "zod";

export async function createSetupScript(
    data: z.infer<typeof setupScriptFormSchema>,
) {
    const id = crypto.randomUUID();
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    await db.insert(setupScript).values({
        id,
        name: data.name,
        description: data.description,
        script: data.script,
        authorId: session.user.id as string,
    });
}
