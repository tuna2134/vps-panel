"use client";
import { Action } from "@/components/pages/dashboard/main";
import { ServerDetail } from "@/components/pages/dashboard/server";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import ServerTable from "@/components/pages/dashboard/server/ServerTable";
import { use, useEffect, useState } from "react";
import { fetchServerById } from "@/lib/api/server";
import { getCookie } from "cookies-next/client";
import { Server } from "@/lib/api/server";

interface ServerParams {
    serverId: string;
}

interface PageProps {
    params: Promise<ServerParams>;
}

const Page: NextPage<PageProps> = ({ params }) => {
    const { serverId } = use(params);
    const [serverData, setServerData] = useState<Server | null>(null);
    const [planId, setPlanId] = useState<number | null>(null);
    useEffect(() => {
        const token = getCookie("token") as string;
        fetchServerById(token, serverId)
            .then((data) => {
                setServerData(data);
                setPlanId(data.plan);
            })
            .catch(() => notFound());
    }, [serverId, setServerData]);
    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <ServerDetail
                        serverName={serverData?.name as string}
                        status={serverData?.status as "offline" | "offline"}
                    />
                    <Action
                        serverId={serverData?.id as string}
                        online={serverData?.status === "online"}
                    />
                </div>
                <div className="mt-18">
                    <ServerTable
                        ip={serverData?.ip_address as string}
                        planId={planId as number}
                        id={serverId}
                    />
                </div>
            </div>
        </>
    );
};

export default Page;
