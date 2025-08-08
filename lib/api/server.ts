export async function fetchServersByUserId(token: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/@me/servers`, {
        method: "GET",
        headers: headers,
    });

    if (!response.ok) {
        throw new Error("Failed to fetch servers");
    }

    return response.json();
}

export interface Server {
    id: string;
    name: string;
    ip_address: string;
    plan: number;
    status: "online" | "offline";
}

export async function fetchServerById(token: string, serverId: string): Promise<Server> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/servers/${serverId}`, {
        method: "GET",
        headers: headers,
    });

    if (!response.ok) {
        throw new Error("Failed to fetch server");
    }

    return response.json();
}

export async function createServer(
    token: string,
    name: string,
    plan: Number,
    serverPassword: string,
) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/servers`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name,
            plan,
            server_password: serverPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create server");
    }

    return response.json();
}

export interface ServerPlan {
    id: number;
    name: string;
    resources: ServerPlanResources;
}

export interface ServerPlanResources {
    cpu: number;
    memory: number;
    disk: number;
}

export interface ServerPlanResponse {
    plans: ServerPlan[];
}

export async function fetchAPI(path: string): Promise<ServerPlanResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch server plans");
    }

    console.log("fetchAPI response:", response);

    return response.json();
}