"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { NextPage } from "next";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface RegisterAccountFormProps {
    afterTemporaryRegistration: (token: string) => void;
}

const RegisterAccountForm: React.FC<RegisterAccountFormProps> = ({
    afterTemporaryRegistration,
}) => {
    const formSchema = z.object({
        username: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        register_passcode: z.string().min(6, "Passcode must be at least 6 characters long"),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    register_passcode: data.register_passcode,
                }),
            },
        );
        if (!res.ok) {
            throw new Error("Failed to register account");
        }
        const payload = await res.json();
        afterTemporaryRegistration(payload.token);
    };
    return (
        <Form {...form}>
            <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ユーザー名</FormLabel>
                            <FormControl>
                                <Input placeholder="taro" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="taro@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="register_passcode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>登録パスコード</FormLabel>
                            <FormControl>
                                <Input placeholder="himitsu-dayo ♡" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">作成</Button>
            </motion.form>
        </Form>
    );
};

interface MainRegisterAccountFormProps {
    token: string;
}

const MainRegisterAccountForm: React.FC<MainRegisterAccountFormProps> = ({
    token,
}) => {
    const router = useRouter();
    const formSchema = z.object({
        code: z.string().min(6, "コードが必須です。"),
        password: z
            .string()
            .min(8, "パスワードは8文字以上である必要があります。"),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
            password: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    code: data.code,
                    password: data.password,
                    token,
                }),
            },
        );
        if (!res.ok) {
            throw new Error("Failed to register account");
        }
        const payload = await res.json();
        setCookie("token", payload.token);
        router.push("/dashboard");
    };
    return (
        <Form {...form}>
            <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>登録コード</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
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
                <Button type="submit">本登録</Button>
            </motion.form>
        </Form>
    );
};

const Page: NextPage = () => {
    const [registering, setRegistering] = useState(true);
    const [tokenForRegistration, setTokenForRegistration] = useState("");
    const afterTemporaryRegistration = (token: string) => {
        setTokenForRegistration(token);
        setRegistering(false);
    };
    return (
        <div className="flex min-h-screen">
            <div className="w-2/3 bg-black">
                <div className="flex h-full items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">
                        StuVPSへようこそ！
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
                        {registering ? "アカウント仮作成" : "アカウント本登録"}
                    </motion.h1>
                    {registering ? (
                        <RegisterAccountForm
                            afterTemporaryRegistration={
                                afterTemporaryRegistration
                            }
                        />
                    ) : (
                        <MainRegisterAccountForm
                            token={tokenForRegistration as string}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
