import { NextPage } from "next";

import { SupporterCard } from "@/components/pages/supporterCard";

const Page: NextPage = () => {
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold tracking-wider text-purple-500">
                サポーター一覧
            </h2>
            <p className="mt-4 text-gray-700">
                このページでは、StuVPSを支援してくださるサポーターの方々をご紹介します。
                <br />
                彼らの支援により、私たちは学生向けのVPSサービスを提供することができています。
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <SupporterCard
                    title={"IPA ICSCoE CyberLab"}
                    image={"/images/no_image_yoko.jpg"}
                    website={"https://www.ipa.go.jp/"}
                />
                <SupporterCard isPrepare />
                <SupporterCard
                    title={"neodyland"}
                    image={"/images/neodyland.webp"}
                    website={"https://neody.land/"}
                />
            </div>
        </div>
    );
};

export default Page;
