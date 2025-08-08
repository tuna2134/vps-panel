"use client";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchAPI, ServerPlanResponse } from "@/lib/api/server";
import useSWR from "swr";

import React from "react";

interface Props {
    ip: string;
    planId?: number;
    id: string;
}

const ServerTable: React.FC<Props> = ({ ip, planId, id }) => {
    const { data, isLoading, error } = useSWR<ServerPlanResponse>("/servers/plans", fetchAPI);
    if (isLoading) {
        return "waiting..."
    }
    if (error) {
        return <div>Error loading server plans</div>;
    }
    const plan = data?.plans.find(p => p.id === planId);
    console.log("ServerTable plans:", data);
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className="font-bold">サービスID</TableCell>
                    <TableCell>{id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">IPアドレス</TableCell>
                    <TableCell>{ip}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">ゲートウェイ</TableCell>
                    <TableCell>
                        {process.env.NETWORK_GATEWAY || "192.168.122.1"}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">プラン</TableCell>
                    <TableCell>
                        <Tooltip>
                            <TooltipTrigger>{plan?.name}</TooltipTrigger>
                            <TooltipContent>
                                <div className="flex flex-col">
                                    <span>CPU: {plan?.resources.cpu}コア</span>
                                    <span>
                                        RAM: {plan?.resources?.memory as number / 1024}
                                        GB
                                    </span>
                                    <span>Disk: {plan?.resources.disk}GB</span>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default ServerTable;
