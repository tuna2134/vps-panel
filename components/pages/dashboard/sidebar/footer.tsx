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
import { ChevronUp } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

export const AppSidebarFooter: React.FC = () => {
    const { data: session, isPending, error } = useSession();
    console.log(session);
    if (error) {
        console.error("Error fetching session:", error);
        return null;
    }
    const handleSignOut = async () => {
        await authClient.signOut();
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
                                            src={session?.user.image || ""}
                                        />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <p>{session?.user.name}</p>
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
