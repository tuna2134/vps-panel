"use client";
import AppSidebar from "@/components/pages/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { user, UserData } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const { isLoading, user: userData } = useAtomValue<UserData>(user);
    useEffect(() => {
        console.log(isLoading)
        if (isLoading) {
            return;
        }
        if (!userData) {
            router.push("/sign-in");
        }
    }, [isLoading, userData, router]);
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="mx-auto my-14 max-w-4xl flex-1 px-4">
                {children}
            </main>
        </SidebarProvider>
    );
};

export default Layout;
