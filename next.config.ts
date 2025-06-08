import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
};

if (process.env.OUTPUT === "standalone") {
    nextConfig.output = "standalone";
}

export default nextConfig;
