import { Button } from "@/components/ui/button";
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Delete, MoreVertical, Plus, Trash } from "lucide-react";
import { NextPage } from "next";
import React from "react";

const Action: React.FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button variant="destructive" className="w-full">
                        <Trash className="text-white" />
                        Delete
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const Page: NextPage = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wider">Server</h1>
                <Button variant="outline">
                    <Plus />
                    Add Server
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
                    <TableRow>
                        <TableCell>
                            <span className="rounded bg-green-500 px-2 py-1 text-white">
                                Online
                            </span>
                        </TableCell>
                        <TableCell>mini-1</TableCell>
                        <TableCell>Webserver</TableCell>
                        <TableCell>192.168.1.0</TableCell>
                        <TableCell>
                            <Action />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};

export default Page;
