"use client";
import { Button } from "@/components/ui/button";
import { fetchSetupScripts } from "@/lib/api/setup-scripts";
import { Plus } from "iconoir-react";
import { LoaderCircle } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const SetupScriptList: React.FC = () => {
    const { data, isLoading, error } = useSWR({}, fetchSetupScripts);
    if (isLoading || !data) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }
    if (error) {
        return <div>Error loading setup scripts</div>;
    }
    return (
        <>
            {data.map((script, index) => (
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
        </>
    );
};

const Page: NextPage = () => {
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
                <SetupScriptList />
            </div>
        </>
    );
};

export default Page;
