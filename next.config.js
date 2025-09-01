/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // pode manter "domains" se só usa imagens locais
    domains: ['localhost', 'calistoai.com.br'],
    formats: ['image/webp', 'image/avif'],

    // Se preferir algo mais explícito para host/porta:
    // remotePatterns: [
    //   { protocol: 'http', hostname: 'localhost' },
    //   { protocol: 'https', hostname: 'localhost' }
    // ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
