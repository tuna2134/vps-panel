import { NextPage } from "next";
import CreateForm from "@/components/pages/dashboard/server/CreateForm";
import { db } from "@/lib/db";
import { setupScript } from "@/lib/db/schemas/setupScript";

const Page: NextPage = async () => {
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
                    Add Server
                </h1>
            </div>
            <CreateForm scripts={scripts} />
        </>
    );
};

export default Page;
