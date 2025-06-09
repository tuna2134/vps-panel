"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
            <Card>
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>Sign in to dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={onClick}
                        variant="outline"
                        className="mt-4"
                    >
                        <GithubIcon />
                        Sign in with GitHub
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
