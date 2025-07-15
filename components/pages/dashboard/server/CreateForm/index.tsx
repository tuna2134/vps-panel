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
import { createServer } from "./action";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { plans, oses } from "@/data/config.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const formSchema = z.object({
    name: z.string().min(1, "Server name is required"),
    type: z.string().min(1, "Server type is required"),
    os: z.string().min(1, "Operating system is required"),
    password: z
        .string()
        .min(10, "Password must be at least 10 characters long"),
    setupScript: z.string().optional(),
});

export interface CreateFormProps {
    scripts: { id: string; name: string }[];
}

const CreateForm: React.FC<CreateFormProps> = ({ scripts }) => {
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
        await createServer(
            values.name,
            values.type,
            values.os,
            values.password,
            values.setupScript === "none" ? undefined : values.setupScript,
        );
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
                                    placeholder="Enter server name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the name of the server that will be
                                displayed in the dashboard.
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
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select server type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {plans.map((plan, index) => (
                                        <SelectItem
                                            key={index}
                                            value={plan.id.toString()}
                                        >
                                            {`${plan.name} ${plan.resource.cpu}core ${plan.resource.memory / 1024}G ${plan.resource.disk}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                memory, cpu, disk, etc. This is the type of
                                server you are adding.
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
                                        <SelectValue placeholder="Select server OS" />
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
                                Select the operating system for the server.
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
                                    placeholder="Enter a strong password (min 10 characters)"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Password for the server. It must be at least 10
                                characters long.
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
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select setup script" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            なし
                                        </SelectItem>
                                        {scripts.map((script) => (
                                            <SelectItem
                                                key={script.id}
                                                value={script.id}
                                            >
                                                {script.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
