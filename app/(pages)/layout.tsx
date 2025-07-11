import Header from "@/components/pages/main/Header";
import Footer from "@/components/pages/main/Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="mx-auto h-screen w-full max-w-3xl px-4">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
