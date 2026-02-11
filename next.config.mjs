/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lastfm.freetls.fastly.net',
            },
            {
                protocol: 'https',
                hostname: '*.lastfm.freetls.fastly.net',
            },
        ],
    },
    transpilePackages: ['three'],
};

export default nextConfig;
