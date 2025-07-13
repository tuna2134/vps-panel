"use client";
import { NextPage } from "next";
import React from "react";
import { createSetupScript } from "./action";
import { SetupScriptEditPage } from "@/components/pages/dashboard/SetupScript/Form";

const Page: NextPage = () => {
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
