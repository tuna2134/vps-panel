"use client";

import { ReactNode, useEffect } from "react";
import { getUser } from "@/lib/api/user";
import { user } from "@/lib/jotai";
import { getCookie } from "cookies-next/client";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const setUser = useSetAtom(user);
    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            getUser(token)
                .then((data) => {
                    setUser({
                        user: data,
                        isLoading: false,
                    });
                })
                .catch((error) => {
                    console.error("Failed to fetch user:", error);
                    router.push("/sign-in");
                });
        }
    }, [setUser]);
    return <>{children}</>;
};
