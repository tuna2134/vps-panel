import AppSidebar from "@/components/pages/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4">
                {children}
            </main>
        </SidebarProvider>
    )
};

export default Layout;