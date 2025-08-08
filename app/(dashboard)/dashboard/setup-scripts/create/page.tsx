"use client";
import { NextPage } from "next";
import React from "react";
import {
    SetupScriptEditPage,
    setupScriptFormSchema,
} from "@/components/pages/dashboard/SetupScript/Form";
import { z } from "zod";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";

const Page: NextPage = () => {
    const createSetupScript = async (
        data: z.infer<typeof setupScriptFormSchema>,
    ) => {
        const token = getCookie("token") as string;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/setup-scripts`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            },
        );
        if (!res.ok) {
            console.error("Failed to create setup script:", res.statusText);
            toast.error("セットアップスクリプトの作成に失敗しました。");
            return;
        }
    };
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold tracking-wider">
                    セットアップスクリプトの作成
                </h2>
            </div>
            <SetupScriptEditPage
                editAction={createSetupScript}
                buttonName="スクリプトを作成する"
            />
        </>
    );
};

export default Page;
