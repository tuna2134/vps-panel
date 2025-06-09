import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronUp, Server } from "lucide-react";
import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getUser } from "@/lib/user";

const AppSidebarContent: React.FC = () => {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="ml-1">
                                    <Server />
                                    <span className="ml-1 font-bold">
                                        Server
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
};

const AppSidebarFooter: React.FC = async () => {
    const session = await getUser();
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage src={session?.user.image || ""} />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <p>{session?.user.name}</p>
                                </div>
                                <ChevronUp className="ml-auto"></ChevronUp>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
};

const AppSidebar: React.FC = () => {
    return (
        <Sidebar>
            <SidebarHeader />
            <AppSidebarContent />
            <AppSidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;
