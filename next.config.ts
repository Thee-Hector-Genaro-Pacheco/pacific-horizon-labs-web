import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
  // which Netlify serves directly (see netlify.toml).
  output: "export",
};

export default nextConfig;
