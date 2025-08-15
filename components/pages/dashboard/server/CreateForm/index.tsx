"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { oses } from "@/data/config.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { createServer, fetchPlanList, ServerPlan } from "@/lib/api/server";
import { getCookie } from "cookies-next/client";
import { fetchSetupScripts, SetupScript } from "@/lib/api/setup-scripts";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
    name: z.string().min(1, "Server name is required"),
    type: z.string().min(1, "Server type is required"),
    os: z.string().min(1, "Operating system is required"),
    password: z
        .string()
        .min(10, "Password must be at least 10 characters long"),
    setupScript: z.string().optional(),
});

const CreateFormSetupScriptSelect: React.FC<
    React.ComponentProps<typeof SelectPrimitive.Root>
> = ({ ...props }) => {
    const { data, error, isLoading } = useSWR<SetupScript[]>(
        {},
        fetchSetupScripts,
    );
    if (error) {
        toast.error(`Failed to fetch setup scripts: ${error.message}`);
    }
    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }
    return (
        <Select {...props}>
            <SelectTrigger>
                <SelectValue placeholder="Select setup script" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                {data?.map((script) => (
                    <SelectItem key={script.id} value={script.id}>
                        {script.title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

const CreateFormPlanSelect: React.FC<
    React.ComponentProps<typeof SelectPrimitive.Root>
> = ({ ...props }) => {
    const { data, error, isLoading } = useSWR<ServerPlan[]>({}, fetchPlanList);
    if (error) {
        toast.error(`Failed to fetch server plans: ${error.message}`);
    }
    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }
    return (
        <Select {...props}>
            <SelectTrigger>
                <SelectValue placeholder="Select setup script" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                {data?.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id.toString()}>
                        {`${plan.name} ${plan.resources.cpu}core ${plan.resources.memory / 1024}G ${plan.resources.disk}GiB`}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

const CreateForm: React.FC = () => {
    const [clicked, setClicked] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "",
            os: "",
            setupScript: "none",
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        toast("Creating server...");
        setClicked(true);
        const token = getCookie("token") as string;
        await createServer(
            token,
            values.name,
            parseInt(values.type, 10),
            values.password,
            values.setupScript === "none"
                ? null
                : parseInt(values.setupScript as string, 10),
        ).catch((error) => {
            toast.error(`Failed to create server: ${error.message}`);
            setClicked(false);
            return;
        });
        toast.success("Server created successfully!");
        router.push("/dashboard");
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 w-full space-y-8 md:w-2/3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Server name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="サーバーの名前を入力してください。"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                ダッシュボードに表示したいサーバの名前を入力してください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Server Type</FormLabel>
                            <CreateFormPlanSelect
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            />
                            <FormDescription>
                                サーバのディスク、メモリ、CPUなどを選択してください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="os"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Server OS</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="サーバのOSを選択してください。" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {oses.map((os, index) => (
                                        <SelectItem
                                            key={index}
                                            value={os.id.toString()}
                                        >
                                            {os.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                サーバのOSを選択してください。現時点ではUbuntuのみとなっています。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="十文字以上のパスワードを入力してください。"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                サーバのパスワードを十文字以上で入力してください。サーバのログインに使います。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="setupScript"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Setup Script (Optional)</FormLabel>
                            <FormControl>
                                <CreateFormSetupScriptSelect
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                />
                            </FormControl>
                            <FormDescription>
                                サーバを作成後に実行するセットアップスクリプトを選んでください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={clicked}>
                    <Plus /> Create
                </Button>
            </form>
        </Form>
    );
};

export default CreateForm;
