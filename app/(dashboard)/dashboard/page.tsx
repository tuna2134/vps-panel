import { ServerTableRow } from "@/components/pages/dashboard/main";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

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
                    <ServerTableRow />
                </TableBody>
            </Table>
        </>
    );
};

export default Page;
