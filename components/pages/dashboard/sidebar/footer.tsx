"use client";
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronUp, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { user } from "@/lib/jotai";
import { deleteCookie } from "cookies-next/client";

export const AppSidebarFooter: React.FC = () => {
    const router = useRouter();
    const [data, _] = useAtom(user);
    const handleSignOut = () => {
        deleteCookie("token");
        router.push("/sign-in");
    };
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={
                                                data?.avatar_url || undefined
                                            }
                                        />
                                        <AvatarFallback>
                                            {data?.username}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p>{data?.username}</p>
                                </div>
                                <ChevronUp className="ml-auto"></ChevronUp>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width]"
                        >
                            <DropdownMenuItem>
                                <Button
                                    onClick={handleSignOut}
                                    className="w-full"
                                    variant="destructive"
                                >
                                    <LogOut className="text-white" />
                                    Sign out
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
};
