import { TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const ServerTableRow: React.FC = () => {
    return (
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
    );
};
