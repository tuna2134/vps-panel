import { NextPage } from "next";
import { editSetupScript } from "./action";
import { SetupScriptEditPage } from "@/components/pages/dashboard/SetupScript/Form";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, unauthorized } from "next/navigation";

interface Params {
    scriptId: string;
}

interface PageProps {
    params: Promise<Params>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
    const { scriptId } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        unauthorized();
    }

    const data = await db
        .select()
        .from(setupScript)
        .where(
            and(
                eq(setupScript.id, scriptId),
                eq(setupScript.authorId, session?.user.id as string),
            ),
        );
    if (data.length === 0) {
        notFound();
    }

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold">
                    Edit Script: {scriptId}
                </h2>
            </div>
            <SetupScriptEditPage
                editAction={editSetupScript}
                buttonName="スクリプトを更新する"
                scriptId={scriptId}
                defaultData={{
                    name: data[0]?.name || "",
                    description: data[0]?.description || "",
                    script: data[0]?.script || "",
                }}
            />
        </>
    );
};

export default Page;
