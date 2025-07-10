import { ServerDetail } from "@/components/pages/dashboard/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { server } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";
import { NextPage } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface ServerParams {
    serverId: string;
}

interface PageProps {
    params: Promise<ServerParams>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
    const { serverId } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const serverData = await db
        .select()
        .from(server)
        .where(
            and(
                eq(server.id, serverId),
                eq(server.authorId, session?.user.id as string),
            ),
        )
        .limit(1)
        .then((res) => res[0]);
    if (!serverData) {
        notFound();
    }
    const res = await fetch(
        `${process.env.VM_CONTROLLER_ENDPOINT}/domains/${serverId}`,
    );
    const data = await res.json();
    const status: "online" | "offline" =
        data.status === "running" ? "online" : "offline";
    return (
        <>
            <div>
                <ServerDetail serverName={serverData.name} status={status} />
            </div>
        </>
    );
};

export default Page;
