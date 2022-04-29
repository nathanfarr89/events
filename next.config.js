/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    API_URI: process.env.API_URI
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URI: process.env.NEXT_PUBLIC_API_URI,
  }
}
