export interface SetupScript {
    id: string;
    title: string;
    description: string;
    script: string;
}

export async function fetchSetupScripts(): Promise<SetupScript[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/setup-scripts`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch setup scripts");
    }

    return response.json();
}
