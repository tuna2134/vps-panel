import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ChevronDown, ChevronUp } from "lucide-react"
import React from "react"

const AppSidebarFooter: React.FC = () => {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <div className="flex space-x-2 items-center">
                                    <Avatar>
                                        <AvatarFallback>Hello</AvatarFallback>
                                    </Avatar>
                                    <p>User</p>
                                </div>
                                <ChevronUp className="ml-auto"></ChevronUp>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

const AppSidebar: React.FC = () => {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent />
            <AppSidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar;