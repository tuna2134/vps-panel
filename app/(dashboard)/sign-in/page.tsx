"use client";
import { NextPage } from "next";
import { motion } from "motion/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page: NextPage = () => {
    const router = useRouter();
    const formSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string(),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log("Form submitted:", data);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            },
        );
        const payload = await res.json();
        if (payload.token) {
            setCookie("token", payload.token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
            router.push("/dashboard");
        }
    };
    return (
        <div className="flex min-h-screen">
            <div className="w-2/3 bg-black">
                <div className="flex h-full items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">
                        おかえりなさいませ！ご主人様
                    </h2>
                </div>
            </div>
            <div className="mx-6 flex w-1/3 items-center justify-center">
                <div className="w-full max-w-xs">
                    <motion.h1
                        className="text-2xl font-bold"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        ログイン
                    </motion.h1>
                    <Form {...form}>
                        <motion.form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-4 space-y-4"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>メールアドレス</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="メールアドレス"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>パスワード</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">ログイン</Button>
                        </motion.form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Page;
