interface ServerDetailProps {
    serverName: string;
}

export const ServerDetail: React.FC<ServerDetailProps> = ({ serverName }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">{serverName}</h1>
        </div>
    );
};
