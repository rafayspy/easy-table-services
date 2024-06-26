/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        disableStaticImages: false,
        minimumCacheTTL: 60,
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
            port: "3000",
            pathname: "/**",
          }
        ],
      },
};

export default nextConfig;
