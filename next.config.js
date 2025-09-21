/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/ndl-koten-ocr-nextjs-app' : '',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    // Worker importの解決を無視
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      use: { loader: 'ignore-loader' }
    });

    // ocr.worker.tsのimportを無視
    config.resolve.alias = {
      ...config.resolve.alias,
      './ocr.worker.ts': false
    };

    return config;
  },
};

export default nextConfig;