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

interface ServerTableRowProps {
    status?: "online" | "offline";
    type: number;
    name: string;
    ip: string;
}

export const ServerTableRow: React.FC<ServerTableRowProps> = ({
    status,
    type,
    name,
    ip,
}) => {
    const plan = plans.find((plan) => plan.id === type);
    return (
        <TableRow>
            <TableCell>
                {status === "online" ? (
                    <span className="rounded bg-green-500 px-2 py-1 text-white">
                        Online
                    </span>
                ) : (
                    <span className="rounded bg-red-500 px-2 py-1 text-white">
                        Offline
                    </span>
                )}
            </TableCell>
            <TableCell>{plan?.name}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{ip}</TableCell>
            <TableCell>
                <Action />
            </TableCell>
        </TableRow>
    );
};
