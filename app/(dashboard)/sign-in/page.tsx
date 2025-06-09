"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { GithubIcon } from "lucide-react";
import { NextPage } from "next";

const Page: NextPage = () => {
    const onClick = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    };
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="">
                <h1 className="text-xl font-bold">Sign In</h1>
                <Button onClick={onClick} variant="outline" className="mt-4">
                    <GithubIcon />
                    Sign in with GitHub
                </Button>
            </div>
        </div>
    );
};

export default Page;
