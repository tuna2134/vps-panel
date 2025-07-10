import { ServerTableRow } from "@/components/pages/dashboard/main";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";
import { Server } from "iconoir-react";
import { Plus } from "lucide-react";
import { NextPage } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

interface Server {
    id: string;
    type: number;
    name: string;
    ip: string;
    state: "online" | "offline";
    createdAt: string;
    authorId: string;
    os: string;
}

const Page: NextPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const servers = await db
        .select()
        .from(server)
        .where(eq(server.authorId, session?.user.id as string));
    // Queryを生成
    // running=true&domains=aa,bb,cc
    const params = new URLSearchParams({
        running: "true",
        domains: servers.map((s) => s.id).join(","),
    }).toString();
    const res = await fetch(
        `${process.env.VM_CONTROLLER_ENDPOINT}/domains?${params}`,
    );
    // DBとAPIのデータを結合
    const data = await res.json();
    const serversWithState: Server[] = servers.map((server) => {
        if (data?.domains !== null && data?.domains.includes(server.id)) {
            return {
                ...server,
                state: "online",
            };
        } else {
            return {
                ...server,
                state: "offline",
            };
        }
    });
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wider">Server</h1>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/servers/create">
                        <Plus />
                        Add Server
                    </Link>
                </Button>
            </div>
            {serversWithState.length === 0 ? (
                <div className="mt-4">
                    <p>
                        サーバが作成されていないため、ありません。 Add
                        Serverボタンをクリックしてサーバを作成してください。
                    </p>
                </div>
            ) : (
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Status</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>IP</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {serversWithState.map((server, index) => (
                            <ServerTableRow
                                key={index}
                                status={server.state}
                                type={server.type}
                                name={server.name}
                                ip={server.ip}
                                id={server.id}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default Page;
