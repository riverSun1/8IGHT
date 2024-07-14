/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "raw.githubusercontent.com",
      "via.placeholder.com",
      "www.wanted.co.kr",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
