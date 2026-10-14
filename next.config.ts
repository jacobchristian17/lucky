import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The site is one page now; send the old page URLs to their sections.
  async redirects() {
    return ["about", "portfolio", "reflections", "contact"].map((s) => ({
      source: `/${s}`,
      destination: `/#${s}`,
      permanent: false,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
