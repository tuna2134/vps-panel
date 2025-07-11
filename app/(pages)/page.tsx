import { NextPage } from "next";

const Page: NextPage = () => {
    return (
        <>
            <div className="flex h-[90vh] items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-wider text-purple-500">
                        学生にVPSを...
                    </h1>
                    <p className="mt-4 text-gray-700">
                        たいていのVPSは値段が高い...
                        <br />
                        学生からすると、財布が痛い...
                        <br />
                        そんな学生のために、StuVPSは学生向けのVPSを提供します。
                    </p>
                </div>
            </div>
            <div className="my-20">
                <h2 className="text-xl font-semibold tracking-wider text-purple-500">
                    運用体制
                </h2>
                <p>ベストエフォート型となっています。</p>
            </div>
            <div className="my-20">
                <h2 className="text-xl font-semibold tracking-wider text-purple-500">
                    完全無料
                </h2>
                <p>
                    学生のために、存在するため、料金は無料です。
                    <br />
                    ※ただし、利用するにあたって審査を行い、120名までの学生に限定しています。
                </p>
            </div>
        </>
    );
};

export default Page;
