import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**", // allow all paths from this domain
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
