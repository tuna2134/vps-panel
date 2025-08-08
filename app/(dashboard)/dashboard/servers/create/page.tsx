import { NextPage } from "next";
import CreateForm from "@/components/pages/dashboard/server/CreateForm";

const Page: NextPage = async () => {
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-wider">
                    サーバを作成
                </h1>
            </div>
            <CreateForm />
        </>
    );
};

export default Page;
