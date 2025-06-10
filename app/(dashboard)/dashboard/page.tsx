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
import { Plus } from "lucide-react";
import { NextPage } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const Page: NextPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const servers = await db
        .select()
        .from(server)
        .where(eq(server.authorId, session?.user.id as string));
    console.log(servers);
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
                <TableBody></TableBody>
            </Table>
        </>
    );
};

export default Page;
