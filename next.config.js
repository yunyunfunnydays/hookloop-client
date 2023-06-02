/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["antd"],
  env: {
    rootUrl: process.env.NODE_ENV === 'production' 
      ? 'https://hookloop-server.onrender.com' 
      : 'http://localhost:8080',
    wsUrl: process.env.NODE_ENV === 'production'
      ? 'ws://hookloop-server.onrender.com'
      : 'ws://localhost:8080',
  },
};

module.exports = nextConfig;
