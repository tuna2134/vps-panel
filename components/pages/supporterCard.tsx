import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { Globe } from "lucide-react";
import Image from "next/image";

interface Props {
    isPrepare?: boolean;
    title?: string;
    image?: string;
    website?: string;
}

export const SupporterCard: React.FC<Props> = ({
    title,
    image,
    website,
    isPrepare,
}) => {
    if (isPrepare) {
        return (
            <Card className="h-full w-full shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <CardContent
                    className={"flex h-full items-center justify-center"}
                >
                    <p className="mb-2 text-center text-lg font-semibold">
                        準備中
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full w-full shadow-lg transition-shadow duration-300 hover:shadow-xl justify-between">
            <CardHeader>
                <Image src={image} alt={title} width={200} height={100} />
                <p className="mb-2 text-center text-lg font-semibold">
                    {title}
                </p>
            </CardHeader>
            <CardFooter className="mt-3 flex items-center justify-center">
                <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    <Globe className="text-gray-500" />
                </a>
            </CardFooter>
        </Card>
    );
};
