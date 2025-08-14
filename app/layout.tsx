"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getUser } from "@/lib/api/user";
import { user } from "@/lib/jotai";
import { getCookie } from "cookies-next/client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
    return (
        <html lang="ja">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
