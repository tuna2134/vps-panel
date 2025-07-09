"use client";
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
import { toast } from "sonner";
import { deleteServer, shutdownServer } from "./action";
import { SystemShut } from "iconoir-react";

interface ActionProps {
    serverId: string;
}

const Action: React.FC<ActionProps> = ({ serverId }) => {
    const handleDelete = async () => {
        toast("Deleting server...");
        try {
            await deleteServer(serverId);
            toast.success("Server deleted successfully");
        } catch (error) {
            console.error("Error deleting server:", error);
            toast.error("Failed to delete server");
        }
    };
    const handleShutdown = async () => {
        toast("Shutting down server...");
        try {
            await shutdownServer(serverId);
            toast.success("Server shutdown successfully");
        } catch (error) {
            console.error("Error shutting down server:", error);
            toast.error("Failed to shutdown server");
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button
                        variant="outline"
                        className="w-full text-red-500"
                        onClick={handleShutdown}
                    >
                        <SystemShut className="text-red-500" />
                        Shutdown
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleDelete}
                    >
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
                <Action serverId={id} />
            </TableCell>
        </TableRow>
    );
};
