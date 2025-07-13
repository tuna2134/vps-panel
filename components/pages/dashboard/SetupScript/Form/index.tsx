"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React from "react";
import { Refresh } from "iconoir-react";

interface SetupScriptFormProps {
    editAction: (
        data: z.infer<typeof setupScriptFormSchema>,
        scriptId?: string,
    ) => Promise<void>;
    buttonName: string;
    scriptId?: string;
    defaultData?: z.infer<typeof setupScriptFormSchema>;
}

export const setupScriptFormSchema = z.object({
    name: z.string().min(1, "名前は必須です"),
    description: z.string().min(10, "10文字以上の説明が必要です"),
    script: z.string().min(1, "スクリプトは必須です"),
});

export const SetupScriptEditPage: React.FC<SetupScriptFormProps> = ({
    editAction,
    buttonName,
    scriptId,
    defaultData = {
        name: "",
        description: "",
        script: "",
    },
}) => {
    const [clicked, setClicked] = React.useState(false);
    const router = useRouter();
    const formMethods = useForm({
        resolver: zodResolver(setupScriptFormSchema),
        defaultValues: {
            name: defaultData.name,
            description: defaultData.description,
            script: defaultData.script,
        },
    });
    const onSubmit = async (data: z.infer<typeof setupScriptFormSchema>) => {
        setClicked(true);
        try {
            toast("処理を実行中...");
            await editAction(data, scriptId);
            toast("処理が実行完了しました。");
            router.push("/dashboard/setup-scripts");
        } catch (error) {
            toast.error("処理に失敗しました。");
            console.error("Error creating setup script:", error);
        }
    };
    return (
        <Form {...formMethods}>
            <form
                className="my-8 space-y-4"
                onSubmit={formMethods.handleSubmit(onSubmit)}
            >
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
                                    className="rounded-lg border"
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
                    {clicked && <Refresh className="mr-2 animate-spin" />}
                    {buttonName}
                </Button>
            </form>
        </Form>
    );
};
