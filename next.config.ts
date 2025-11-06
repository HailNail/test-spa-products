import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**", // allow all paths from this domain
      },
    ],
  },
  basePath: "/test-spa-products",
  assetPrefix: "/test-spa-products/",
  reactCompiler: true,
};

export default nextConfig;
