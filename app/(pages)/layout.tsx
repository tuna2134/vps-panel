import Header from "@/components/pages/main/Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="mx-auto w-full max-w-3xl px-4">{children}</main>
        </>
    );
};

export default Layout;
