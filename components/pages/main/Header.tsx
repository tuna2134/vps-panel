"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
    const session = useSession();
    const isLoggedIn = !!session.data;
    return (
        <header className="flex h-16 w-full items-center border-b">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4">
                <h1 className="text-2xl font-bold">StuVPS</h1>
                <div className="flex space-x-4">
                    <Link href="/about">About</Link>
                    <Link href="/supporter">Supporter</Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <Link href="/dashboard" className="flex items-center">
                            <Avatar>
                                <AvatarImage
                                    src={session.data?.user?.image || ""}
                                    alt="User Avatar"
                                />
                                <AvatarFallback>
                                    {session.data?.user?.name}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Button asChild>
                            <Link href="/dashboard">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
