import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Tells Next.js to generate static HTML/CSS/JS files
  images: {
    unoptimized: true, // Required for next/image to work on static hosts like GitHub Pages
  },
  // If you are NOT using a custom domain (like hanulbucovinei.rooms-wizard.com)
  // and are instead hosting on "username.github.io/repo-name", uncomment the line below:
  basePath: "/hanbucovinademo",
};

export default nextConfig;
