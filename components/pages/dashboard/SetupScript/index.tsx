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
import { deleteScript } from "./action";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EditAndDeleteProps {
    scriptId: string;
}

export const EditAndDelete: React.FC<EditAndDeleteProps> = ({ scriptId }) => {
    const router = useRouter();

    const handleDelete = async () => {
        toast("Deleting script...");
        const res = await deleteScript(scriptId);
        if (res.success) {
            toast.success("Script deleted successfully");
            router.push("/dashboard/setup-scripts");
        } else {
            toast.error(res.error || "Failed to delete script");
        }
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
