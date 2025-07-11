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
                        <div>
                            <p>
                                この活動は様々な組織による支援の下成り立っています。
                                <br />
                                詳細は
                                <Link
                                    href="/supporter"
                                    className="border-b text-sm"
                                >
                                    支援者一覧
                                </Link>
                                をご覧ください。
                            </p>
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
