import { ServerStatus } from "../main";

interface ServerDetailProps {
    serverName: string;
}

export const ServerDetail: React.FC<ServerDetailProps> = ({ serverName }) => {
    return (
        <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{serverName}</h1>
            <ServerStatus status="online" />
        </div>
    );
};
