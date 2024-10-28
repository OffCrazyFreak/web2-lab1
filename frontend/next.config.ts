// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Putanja na frontend-u
        destination: "http://localhost:8080/api/:path*", // Putanja do backend-a
      },
    ];
  },
};

module.exports = nextConfig;
