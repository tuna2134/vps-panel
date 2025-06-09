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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronUp } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

export const AppSidebarFooter: React.FC = () => {
    const { data: session, isPending, error } = useSession();
    console.log(session);
    if (error) {
        console.error("Error fetching session:", error);
        return null; // or handle the error appropriately
    }
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage src={session?.image || ""} />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <p>{!isPending && "aaaa"}</p>
                                </div>
                                <ChevronUp className="ml-auto"></ChevronUp>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
};