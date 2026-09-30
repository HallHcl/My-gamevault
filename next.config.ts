import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repo = 'My-gamevault';
const basePath = isGithubActions ? `/${repo}` : '';

const nextConfig: NextConfig = {
  // Only use static export if explicitly requested for GitHub Pages; otherwise run fullstack for Vercel/Node
  output: isGithubActions ? 'export' : undefined,
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
