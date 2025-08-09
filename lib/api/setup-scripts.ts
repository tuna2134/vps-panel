import { getCookie } from "cookies-next/client";

export interface SetupScript {
    id: string;
    title: string;
    description: string;
    script: string;
    author_id: number;
}

export async function fetchSetupScripts(): Promise<SetupScript[]> {
    const token = getCookie("token") as string;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/setup-scripts`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch setup scripts");
    }

    return response.json();
}

export async function fetchSetupScript(scriptId: string): Promise<SetupScript> {
    const token = getCookie("token") as string;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/setup-scripts/${scriptId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch setup script");
    }

    return response.json();
}