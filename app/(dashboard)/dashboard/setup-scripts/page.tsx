"use client";
import { Button } from "@/components/ui/button";
import { fetchSetupScripts } from "@/lib/api/setup-scripts";
import { Plus } from "iconoir-react";
import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

const Page: NextPage = () => {
    const { data, isLoading, error } = useSWR({}, fetchSetupScripts);
    console.log(data);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading setup scripts</div>;
    }
    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-wider">
                        セットアップスクリプト
                    </h2>
                    <Button asChild variant="outline">
                        <Link
                            href="/dashboard/setup-scripts/create"
                            className="mt-4"
                        >
                            <Plus />
                            スクリプトを作成する
                        </Link>
                    </Button>
                </div>
                <p className="mt-4 text-sm text-gray-700">
                    サーバーを構築した後、スクリプトを実行してくれる機能です。
                </p>
            </div>
            <div className="mt-8">
                {data?.map((script, index) => (
                    <div key={index}>
                        <Link
                            href={`/dashboard/setup-scripts/${script.id}`}
                            className="mb-4 block rounded-lg bg-white p-4 shadow hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-semibold">
                                {script.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {script.description}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Page;

export const dynamic = "force-dynamic";
