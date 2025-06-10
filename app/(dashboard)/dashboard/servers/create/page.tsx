"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    name: z.string().min(1, "Server name is required"),
    type: z.string().min(1, "Server type is required"),
    os: z.string().min(1, "Operating system is required"),
});

const Page: NextPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {};
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-wider">
                    Add Server
                </h1>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="mt-6 space-y-8"
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
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    );
};

export default Page;
