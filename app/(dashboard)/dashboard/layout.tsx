"use client";
import AppSidebar from "@/components/pages/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/api/user";
import { user } from "@/lib/jotai";
import { getCookie } from "cookies-next/client";
import { useAtom } from "jotai";
import useSWR from "swr";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const token = getCookie("token") as string;
    if (!token) {
        "use server";
    }
    const { data, error, isLoading } = useSWR(token, getUser);
    if (error) {
        console.error("Error fetching user data:", error);
        return <div>Error loading user data</div>;
    }
    if (isLoading) return <div>Loading...</div>;
    const [_, setUser] = useAtom(user);
    setUser(data);
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
