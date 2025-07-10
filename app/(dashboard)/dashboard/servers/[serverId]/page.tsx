import { Action } from "@/components/pages/dashboard/main";
import { ServerDetail } from "@/components/pages/dashboard/server";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";
import { NextPage } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { plans } from "@/data/config.json";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ServerTable from "@/components/pages/dashboard/server/ServerTable";

interface ServerParams {
    serverId: string;
}

interface PageProps {
    params: Promise<ServerParams>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
    const { serverId } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const serverData = await db
        .select()
        .from(server)
        .where(
            and(
                eq(server.id, serverId),
                eq(server.authorId, session?.user.id as string),
            ),
        )
        .limit(1)
        .then((res) => res[0]);
    if (!serverData) {
        notFound();
    }
    const res = await fetch(
        `${process.env.VM_CONTROLLER_ENDPOINT}/domains/${serverId}`,
    );
    const data = await res.json();
    const status: "online" | "offline" =
        data.status === "running" ? "online" : "offline";
    const plan = plans.find((p) => p.id === serverData.type);
    if (!plan) {
        notFound();
    }
    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <ServerDetail
                        serverName={serverData.name}
                        status={status}
                    />
                    <Action
                        serverId={serverData.id}
                        online={status === "online"}
                    />
                </div>
                <div className="mt-18">
                    <ServerTable ip={serverData.ip} plan={plan} />
                </div>
            </div>
        </>
    );
};

export default Page;
