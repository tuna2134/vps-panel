import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { Globe } from "lucide-react";
import Image from "next/image";

interface BaseProps {
    isPrepare?: boolean;
}

interface PrepareProps extends BaseProps {
    isPrepare: true;
}

interface NonPrepareProps extends BaseProps {
    isPrepare?: false;
    title: string;
    image: string;
    website: string;
}

type Props = PrepareProps | NonPrepareProps;

export const SupporterCard: React.FC<Props> = (props) => {
    if (props.isPrepare) {
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

    const { title, image, website } = props;

    return (
        <Card className="h-full w-full justify-between shadow-lg transition-shadow duration-300 hover:shadow-xl">
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
