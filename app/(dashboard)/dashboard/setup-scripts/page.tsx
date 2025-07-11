import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-wider">セットアップスクリプト</h2>
                    <Button asChild variant="outline">
                        <Link href="/dashboard/setup-scripts/create" className="mt-4">
                            スクリプトを作成する
                        </Link>
                    </Button>
                </div>
                <p className="text-sm text-gray-700 mt-4">サーバーを構築した後、スクリプトを実行してくれる機能です。</p>
            </div>
            <div className="mt-8">
                
            </div>
        </>
    );
};

export default Page;
