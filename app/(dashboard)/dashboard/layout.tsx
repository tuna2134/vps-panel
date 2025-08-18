"use client";
import AppSidebar from "@/components/pages/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { user } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const { isLoading, user } = useAtomValue<UserData>(user);
    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (!user) {
            router.push("/sign-in");
        }
    }, [isLoading, router]);
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
