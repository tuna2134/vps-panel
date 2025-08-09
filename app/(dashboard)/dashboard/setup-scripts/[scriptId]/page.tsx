"use client";
import { NextPage } from "next";
import { EditAndDelete } from "@/components/pages/dashboard/SetupScript";
import { use } from "react";
import useSWR from "swr";
import { fetchSetupScript, SetupScript } from "@/lib/api/setup-scripts";
import { useAtom } from "jotai";
import { user } from "@/lib/jotai";
import { LoaderCircle } from "lucide-react";

interface Params {
    scriptId: string;
}

interface PageProps {
    params: Promise<Params>;
}

const Page: NextPage<PageProps> = ({ params }) => {
    const { scriptId } = use(params);
    const { data, isLoading, error } = useSWR<SetupScript>(
        scriptId,
        fetchSetupScript,
    );
    const [userData, _] = useAtom(user);
    if (isLoading || !data) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }
    if (error) return <div>Error: {error.message}</div>;
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-wider">
                        セットアップスクリプトの詳細
                    </h2>
                    <p className="mt-4">スクリプト名: {data.title || "不明"}</p>
                </div>
                {data.author_id === userData?.id && (
                    <EditAndDelete scriptId={scriptId} />
                )}
            </div>
            <div className="mt-8">
                <pre className="rounded bg-gray-100 p-4">
                    {data.script || "スクリプトが見つかりません。"}
                </pre>
            </div>
        </>
    );
};

export default Page;
