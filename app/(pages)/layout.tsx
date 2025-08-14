import Header from "@/components/pages/main/Header";
import Footer from "@/components/pages/main/Footer";
import { Metadata } from "next";

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "StuVPS",
    description: "学生による学生のための学生のVPS",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="mx-auto min-h-screen w-full max-w-3xl px-4">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
