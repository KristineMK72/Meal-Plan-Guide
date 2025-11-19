// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you use an external image hosting service like Imgur, add its domain here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // Change this if you use a different host!
        port: '',
        pathname: '/**',
      },
    ],
  },
  // If you are using 'unoptimized={true}' as shown above, you can often skip this 
  // configuration, but it's best practice to include it if you switch off unoptimized.
};

module.exports = nextConfig;
