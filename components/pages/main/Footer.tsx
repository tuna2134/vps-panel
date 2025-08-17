import { Discord, X } from "iconoir-react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="h-48 w-full bg-pink-900 text-white">
            <div className="mx-auto flex h-full w-full max-w-3xl items-center px-4">
                <div className="w-full">
                    <div className="flex items-center justify-between space-x-4">
                        <h2 className="text-lg font-semibold tracking-wider">
                            StuVPS
                        </h2>
                        <div className="space-y-0.1 flex flex-col">
                            <h3 className="text-sm font-semibold tracking-wider">
                                Links
                            </h3>
                            <Link href="/about" className="mt-2 text-sm">
                                About
                            </Link>
                            <Link href="/supporter" className="text-sm">
                                Supporter
                            </Link>
                            <Link href="/dashboard" className="text-sm">
                                Dashboard
                            </Link>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="https://discord.gg/tzm8FTsxZs">
                                <Discord className="text-xl" />
                            </Link>
                            <Link href="https://x.com/proj_stuvps">
                                <X className="text-xl" />
                            </Link>
                        </div>
                    </div>
                    <p className="mt-6 text-center text-sm">
                        © {new Date().getFullYear()} StuVPS. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
