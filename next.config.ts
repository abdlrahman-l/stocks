import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "https://usstocksexchange.vercel.app"
        },
        {
          key: "Access-Control-Allow-Method",
          value: "GET"
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type"
        },
      ]
    }
  ]
};

export default nextConfig;
