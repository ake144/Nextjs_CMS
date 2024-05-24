/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [],

      remotePatterns: [
        {
          protocol: "https",
          hostname: "'utfs.io/*',",
          port: "",
          pathname: "",
        },],
    },
  };
  
  export default nextConfig;
  