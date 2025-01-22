module.exports = {
  images: {
    domains: ['s3-alpha-sig.figma.com','cdn.sanity.io',"car-rental-website-five.vercel.app"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
