import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";

interface Props {
    ip: string;
    plan: PropsPlan;
    id: string;
}

interface PropsPlan {
    name: string;
    resource: {
        cpu: number;
        memory: number;
        disk: number;
    };
}

const ServerTable: React.FC<Props> = ({ ip, plan, id }) => {
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
                            <TooltipTrigger>{plan.name}</TooltipTrigger>
                            <TooltipContent>
                                <div className="flex flex-col">
                                    <span>CPU: {plan.resource.cpu}コア</span>
                                    <span>
                                        RAM: {plan.resource.memory / 1024}
                                        GB
                                    </span>
                                    <span>Disk: {plan.resource.disk}GB</span>
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
