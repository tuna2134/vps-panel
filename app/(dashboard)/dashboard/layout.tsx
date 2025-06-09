import AppSidebar from "@/components/pages/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="mx-auto mt-14 max-w-5xl flex-1 px-4">
                {children}
            </main>
        </SidebarProvider>
    );
};

export default Layout;
