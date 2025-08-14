"use client";

import { ReactNode, useEffect } from "react";
import { getUser } from "@/lib/api/user";
import { user } from "@/lib/jotai";
import { getCookie } from "cookies-next/client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const [_, setUser] = useAtom(user);
    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            getUser(token)
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error("Failed to fetch user:", error);
                    router.push("/sign-in");
                });
        }
    }, [setUser]);
    return <>{children}</>;
};
