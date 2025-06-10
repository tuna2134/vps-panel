import { TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/data/config.json";
import Link from "next/link";
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

interface ServerStatusProps {
    status?: "online" | "offline";
}

export const ServerStatus: React.FC<ServerStatusProps> = ({ status }) => {
    return (
        <>
            {status === "online" ? (
                <span className="rounded bg-green-500 px-2 py-1 text-white">
                    Online
                </span>
            ) : (
                <span className="rounded bg-red-500 px-2 py-1 text-white">
                    Offline
                </span>
            )}
        </>
    );
};

interface ServerTableRowProps {
    status?: "online" | "offline";
    type: number;
    name: string;
    ip: string;
    id: string;
}

export const ServerTableRow: React.FC<ServerTableRowProps> = ({
    status,
    type,
    name,
    ip,
    id,
}) => {
    const plan = plans.find((plan) => plan.id === type);
    return (
        <TableRow>
            <TableCell>
                <ServerStatus status={status} />
            </TableCell>
            <TableCell>{plan?.name}</TableCell>
            <TableCell>
                <Button variant="link" asChild>
                    <Link href={`/dashboard/servers/${id}`}>{name}</Link>
                </Button>
            </TableCell>
            <TableCell>{ip}</TableCell>
            <TableCell>
                <Action />
            </TableCell>
        </TableRow>
    );
};
