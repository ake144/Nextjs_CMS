/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'utfs.io',
        },
      ],
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '4mb',
      },
    },
  };
  
  export default nextConfig;
  