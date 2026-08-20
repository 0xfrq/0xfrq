import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/share/:folder",
        destination: "/static/:folder/index.html",
      },
      {
        source: "/share/:folder/:path*",
        destination: "/static/:folder/:path*",
      },
    ];
  },
};

export default nextConfig;
