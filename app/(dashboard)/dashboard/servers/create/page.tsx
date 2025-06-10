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
import { NextPage } from "next";
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
import plans from "./plans.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, "Server name is required"),
    type: z.string().min(1, "Server type is required"),
    os: z.string().min(1, "Operating system is required"),
});

const Page: NextPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Form values:", values);
        await createServer(values.name, values.type, values.os);
        toast.success("Server created successfully!");
    };
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-wider">
                    Add Server
                </h1>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 mt-6 space-y-8"
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
                    <Button type="submit">
                        <Plus /> Create
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default Page;
