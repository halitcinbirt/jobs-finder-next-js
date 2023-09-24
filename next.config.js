/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    SITE_URL: process.env.SITE_URL
  },
};
