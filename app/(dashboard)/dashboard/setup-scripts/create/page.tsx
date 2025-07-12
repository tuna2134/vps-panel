"use client";
import { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Editor from '@monaco-editor/react';
import { Button } from "@/components/ui/button";

const Page: NextPage = () => {
    const formSchema = z.object({
        name: z.string().min(1, "名前は必須です"),
        description: z.string(). min(10, "10文字以上の説明が必要です"),
        script: z.string().min(1, "スクリプトは必須です"),
    });
    const formMethods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            script: "",
        },
    });
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form submitted:", data);
    };
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold tracking-wider">セットアップスクリプトの作成</h2>
            </div>
            <Form {...formMethods}>
                <form className="my-8 space-y-4" onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <FormField
                        control={formMethods.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>スクリプトの名称</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="例：パッケージアップデート"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    スクリプトの名称を入力してください。
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formMethods.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>スクリプトの説明</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="例：サーバーのパッケージを最新に更新します。"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    スクリプトの説明を入力してください。
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formMethods.control}
                        name="script"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>スクリプト内容</FormLabel>
                                <FormControl>
                                    <Editor
                                        defaultLanguage="bash"
                                        height="90vh"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    実行するスクリプトの内容を入力してください。
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-4">
                        スクリプトを作成する
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default Page;