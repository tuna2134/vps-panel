import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-pink-900 h-48 w-full text-white">
            <div className="mx-auto flex max-w-3xl items-center h-full w-full px-4">
                <div className="w-full">
                    <div className="flex items-center justify-between space-x-4">
                        <h2 className="text-lg font-semibold tracking-wider">
                            StuVPS
                        </h2>
                        <div className="flex flex-col space-y-0.1">
                            <h3 className="text-sm font-semibold tracking-wider">
                                Links
                            </h3>
                            <Link href="/about" className="text-sm mt-2">
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
                                詳細は<Link href="/supporter" className="text-sm border-b">支援者一覧</Link>をご覧ください。
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-center mt-6">
                        © {new Date().getFullYear()} StuVPS. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;