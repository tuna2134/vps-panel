"use client";
import { ServerTableRow } from "@/components/pages/dashboard/main";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchServersByUserId } from "@/lib/api/server";
import { getCookie } from "cookies-next/client";
import { Server } from "iconoir-react";
import { Plus } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

interface Server {
    id: string;
    type: number;
    name: string;
    ip_address: string;
    status: "online" | "offline";
}

const Page: NextPage = () => {
    const [servers, setServers] = React.useState<Server[]>([]);
    React.useEffect(() => {
        const token = getCookie("token") as string;
        fetchServersByUserId(token).then((data) => {
            setServers(data);
        });
    }, [setServers]);
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
            {servers.length === 0 ? (
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
                        {servers.map((server, index) => (
                            <ServerTableRow
                                key={index}
                                status={server.status}
                                type={server.type}
                                name={server.name}
                                ip={server.ip_address}
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
