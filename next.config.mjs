/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "chatapp-client-beta.vercel.app",
      "chat-app-server-fpdu.onrender.com",
    ],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: [
        "chatapp-client-beta.vercel.app",
        "chat-app-server-fpdu.onrender.com",
      ], // Allow images from your app's domain
      pathname: "/images/**", // Adjust this path based on your image storage structure
    },
  ],
};

export default nextConfig;
