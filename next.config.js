/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["antd"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.filestackcontent.com",
        port: "",
      },
    ],
  },
  env: {
    rootUrl: process.env.NODE_ENV === "production" ? process.env.SERVER_HTTP_REMOTE_URL : process.env.SERVER_HTTP_LOCAL_URL,
    wsUrl: process.env.NODE_ENV === "production" ? process.env.SERVER_WS_REMOTE_URL : process.env.SERVER_WS_LOCAL_URL,
  },
};

module.exports = nextConfig;
