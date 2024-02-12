/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    output: 'export',
    eslint: {
      ignoreDuringBuilds: true,
    },
};

export default nextConfig;
