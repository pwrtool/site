/** @type {import('next').NextConfig} */
const withMdx = require("@next/mdx")();
const nextConfig = {
  pageExtensions: ["jsx", "mdx", "tsx"],
};

module.exports = withMdx(nextConfig);
