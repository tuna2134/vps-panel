"use client";

import { ReactNode, useEffect } from "react";
import { getUser } from "@/lib/api/user";
import { user } from "@/lib/jotai";
import { getCookie } from "cookies-next/client";
import { useSetAtom } from "jotai";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                    setUser({ user: null, isLoading: false });
                });
        } else {
            setUser({ user: null, isLoading: false });
        }
    }, [setUser]);
    return <>{children}</>;
};
