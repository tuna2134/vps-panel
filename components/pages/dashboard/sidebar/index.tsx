import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Server } from "lucide-react";
import React from "react";
import Link from "next/link";
import { AppSidebarFooter } from "./footer";

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
