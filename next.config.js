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
    rootUrl: process.env.NODE_ENV === "production" ? "http://ec2-3-83-67-168.compute-1.amazonaws.com:8080" : "http://localhost:8080",
    wsUrl: process.env.NODE_ENV === "production" ? "http://ec2-3-83-67-168.compute-1.amazonaws.com:8080" : "ws://localhost:8080",
  },
};

module.exports = nextConfig;
