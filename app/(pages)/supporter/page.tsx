import { NextPage } from "next";
import Image from "next/image";

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
                <div className="rounded-lg border p-4 shadow">
                    <Image
                        src="/images/no_image_yoko.jpg"
                        alt="no image"
                        height={266}
                        width={400}
                    />
                    <p className="mb-2 text-center font-semibold">IPA ICSCoE CyberLab</p>
                </div>
                <div className="rounded-lg border p-4 shadow">
                    <p className="mb-2 text-center font-semibold">準備中</p>
                </div>
                <div className="rounded-lg border p-4 shadow">
                    <Image
                        src="/images/neodyland.webp"
                        alt="neodyland logo"
                        height={190}
                        width={397}
                    />
                    <p className="mb-2 text-center font-semibold">neodyland</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
