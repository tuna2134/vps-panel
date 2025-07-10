import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="flex h-16 w-full items-center border-b">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4">
                <h1 className="text-2xl font-bold">StuVPS</h1>
                <div className="flex space-x-4">
                    <Link href="/about">About</Link>
                    <Link href="/supporter">Supporter</Link>
                </div>
                <div>
                    <Button asChild>
                        <Link href="/dashboard">Login</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
