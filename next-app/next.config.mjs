/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // On exporte un site statique pour GitHub Pages
  output: "export",
};

export default nextConfig;
