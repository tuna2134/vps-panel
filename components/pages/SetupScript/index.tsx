import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bin, Edit, MoreVert } from "iconoir-react";

export const EditAndDelete: React.FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVert />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button variant="outline" className="w-full">
                        <Edit />
                        編集
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant="destructive" className="w-full">
                        <Bin className="text-white" />
                        編集
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
