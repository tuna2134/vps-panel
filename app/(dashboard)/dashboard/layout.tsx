"use client";
import AppSidebar from "@/components/pages/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { user } from "@/lib/jotai";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const session = useAtomValue(user);
    useEffect(() => {
        if (!session) {
            router.push("/sign-in");
        }
    }, [session, router]);
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
