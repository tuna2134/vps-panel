import AppSidebar from "@/components/pages/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
