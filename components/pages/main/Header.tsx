"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAtom } from "jotai";
import { user } from "@/lib/jotai";

const Header: React.FC = () => {
    const [data, _] = useAtom(user);
    return (
        <header className="flex h-16 w-full items-center border-b">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4">
                <Link href="/">
                    <h1 className="text-2xl font-bold">StuVPS</h1>
                </Link>
                <div className="flex space-x-4">
                    <Link href="/about">About</Link>
                    <Link href="/supporter">Supporter</Link>
                </div>
                <div>
                    {data ? (
                        <Link href="/dashboard" className="flex items-center">
                            <Avatar>
                                <AvatarImage
                                    src={data?.avatar_url || ""}
                                    alt="User Avatar"
                                />
                                <AvatarFallback>
                                    {data?.username}
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
