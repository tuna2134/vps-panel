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
import { LoaderCircle, Plus } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface Server {
    id: string;
    plan: number;
    name: string;
    ip_address: string;
    status: "online" | "offline";
}

const ServerListTable = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, isLoading, error } = useSWR<Server[]>(
        mounted ? (getCookie("token") as string) : null,
        fetchServersByUserId,
    );

    if (isLoading || !data) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }
    if (error) {
        return <h2 className="text-2xl">よくわからん、エラー</h2>;
    }
    if (data?.length === 0) {
        return (
            <div className="mt-4">
                <p>
                    サーバが作成されていないため、ありません。 Add
                    Serverボタンをクリックしてサーバを作成してください。
                </p>
            </div>
        );
    }
    return (
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
                {data?.map((server, index) => (
                    <ServerTableRow
                        key={index}
                        status={server.status}
                        type={server.plan}
                        name={server.name}
                        ip={server.ip_address}
                        id={server.id}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

const Page: NextPage = () => {
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
            <ServerListTable />
        </>
    );
};

export default Page;
