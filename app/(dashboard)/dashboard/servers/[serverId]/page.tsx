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
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold">
                                    IPアドレス
                                </TableCell>
                                <TableCell>{serverData.ip}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    ゲートウェイ
                                </TableCell>
                                <TableCell>192.168.122.1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    プラン
                                </TableCell>
                                <TableCell>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {plan.name}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="flex flex-col">
                                                <span>
                                                    CPU: {plan.resource.cpu}コア
                                                </span>
                                                <span>
                                                    RAM:{" "}
                                                    {plan.resource.memory /
                                                        1024}
                                                    GB
                                                </span>
                                                <span>
                                                    Disk: {plan.resource.disk}GB
                                                </span>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Page;
