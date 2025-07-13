import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { eq } from "drizzle-orm";
import { NextPage } from "next";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { EditAndDelete } from "@/components/pages/SetupScript";

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
    if (!session) {
        unauthorized();
    }
    const script = await db
        .select()
        .from(setupScript)
        .where(eq(setupScript.id, scriptId));
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-wider">
                        セットアップスクリプトの詳細
                    </h2>
                    <p className="mt-4">
                        スクリプト名: {script[0]?.name || "不明"}
                    </p>
                </div>
                {script[0]?.authorId === session.user.id && (
                    <EditAndDelete scriptId={scriptId} />
                )}
            </div>
            <div className="mt-8">
                <pre className="rounded bg-gray-100 p-4">
                    {script[0]?.script || "スクリプトが見つかりません。"}
                </pre>
            </div>
        </>
    );
};

export default Page;
