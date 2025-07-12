import { Button } from "@/components/ui/button";
import { Plus } from "iconoir-react";
import { NextPage } from "next";
import Link from "next/link";

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
            <div className="mt-8"></div>
        </>
    );
};

export default Page;
