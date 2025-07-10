import { ServerStatus } from "../main";

interface ServerDetailProps {
    serverName: string;
    status: "online" | "offline";
}

export const ServerDetail: React.FC<ServerDetailProps> = ({
    serverName,
    status,
}) => {
    return (
        <div className="flex items-center space-x-4">
            <ServerStatus status={status} />
            <h1 className="text-2xl font-bold">{serverName}</h1>
        </div>
    );
};
