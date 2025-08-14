import { getCookie } from "cookies-next/client";
import { z } from "zod";
import { setupScriptFormSchema } from "@/components/pages/dashboard/SetupScript/Form";
import { toast } from "sonner";

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

export async function putSetupScript(
    scriptId: string,
    data: z.infer<typeof setupScriptFormSchema>,
): Promise<void> {
    const token = getCookie("token") as string;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/setup-scripts/${scriptId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to update setup script");
    }
}

export async function deleteScript(scriptId: string): Promise<void> {
    const token = getCookie("token") as string;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/setup-scripts/${scriptId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        toast.error("Failed to delete setup script");
        throw new Error("Failed to delete setup script");
    }
}