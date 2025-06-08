import AppSidebar from "@/components/pages/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 max-w-5xl mx-auto px-4 mt-14">
                {children}
            </main>
        </SidebarProvider>
    )
};

export default Layout;