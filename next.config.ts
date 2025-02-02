import compression from 'vite-plugin-compression';
module.exports = {
  images: {
    domains: ['s3-alpha-sig.figma.com','cdn.sanity.io',"car-rental-website-five.vercel.app"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
      }
    ],
   
  },
  plugins: [
    compression({
      algorithm: 'gzip', // or 'brotliCompress', 'deflate', 'deflateRaw'
      threshold: 1024, // Only compress files larger than 1KB
      ext: '.gz', // Output file extension
      deleteOriginFile: false, // Set to true to delete the original uncompressed files
    })
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
