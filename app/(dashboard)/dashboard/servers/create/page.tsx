import { NextPage } from "next";
import CreateForm from "@/components/pages/dashboard/server/CreateForm";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { unauthorized } from "next/navigation";

const Page: NextPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        unauthorized();
    }
    
    const scripts = await db
        .select({
            id: setupScript.id,
            name: setupScript.name,
        })
        .from(setupScript);
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-wider">
                    サーバを作成
                </h1>
            </div>
            <CreateForm scripts={scripts} />
        </>
    );
};

export default Page;
