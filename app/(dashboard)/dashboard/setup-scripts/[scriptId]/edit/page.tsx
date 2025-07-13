"use server";
import { NextPage } from "next";
import { editSetupScript } from "./action";
import { SetupScriptEditPage } from "@/components/pages/dashboard/SetupScript/Form";

interface Params {
    scriptId: string;
}

interface PageProps {
    params: Promise<Params>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
    const { scriptId } = await params;

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
            />
        </>
    );
};

export default Page;
