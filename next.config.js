/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/ndl-koten-ocr-nextjs-app' : '',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Worker関連のimportエラーを回避
    config.resolve.alias = {
      ...config.resolve.alias,
      './ocr.worker.ts': false
    };
    return config;
  },
};