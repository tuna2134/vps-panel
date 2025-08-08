"use client";
import AppSidebar from "@/components/pages/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/api/user";
import { user } from "@/lib/jotai";
import { getCookie } from "cookies-next/client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const [_, setUser] = useAtom(user);
    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            getUser(token).then((data) => {
                setUser(data);
            }).catch((error) => {
                console.error("Failed to fetch user:", error);
                router.push("/sign-in");
            });
        }
    }, [setUser]);
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
