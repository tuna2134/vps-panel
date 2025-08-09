"use client";
import { NextPage } from "next";
import { SetupScriptEditPage, setupScriptFormSchema } from "@/components/pages/dashboard/SetupScript/Form";
import { use } from "react";
import useSWR from "swr";
import { fetchSetupScript, putSetupScript, SetupScript } from "@/lib/api/setup-scripts";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";

interface Params {
    scriptId: string;
}

interface PageProps {
    params: Promise<Params>;
}

const Page: NextPage<PageProps> = ({ params }) => {
    const { scriptId } = use(params);
    const { data, isLoading, error} = useSWR<SetupScript>(scriptId, fetchSetupScript);
    if (isLoading || !data) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }
    if (error) return <div>Error: {error.message}</div>;
    async function editSetupScript(
        data: z.infer<typeof setupScriptFormSchema>,
        scriptId?: string,
    ) {
        await putSetupScript(scriptId || "", data);
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
                    title: data.title || "",
                    description: data.description || "",
                    script: data.script || "",
                }}
            />
        </>
    );
};

export default Page;
