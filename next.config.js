/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("lightningcss");
    }

    return config;
  },
};

module.exports = nextConfig; 