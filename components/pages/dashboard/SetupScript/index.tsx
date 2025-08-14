"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bin, Edit, MoreVert } from "iconoir-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteScript } from "@/lib/api/setup-scripts";

interface EditAndDeleteProps {
    scriptId: string;
}

export const EditAndDelete: React.FC<EditAndDeleteProps> = ({ scriptId }) => {
    const router = useRouter();

    const handleDelete = async () => {
        toast("Deleting script...");
        await deleteScript(scriptId).catch((error) => {
            toast.error(`Failed to delete script: ${error.message}`);
        });
        toast.success("Script deleted successfully");
        router.push("/dashboard/setup-scripts");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVert />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button variant="outline" className="w-full" asChild>
                        <Link
                            href={`/dashboard/setup-scripts/${scriptId}/edit`}
                        >
                            <Edit />
                            編集
                        </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleDelete}
                    >
                        <Bin className="text-white" />
                        削除
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
