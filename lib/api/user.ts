export async function getUser(token: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/@me`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    return response.json();
}
