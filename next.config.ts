import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const repoName = "portofolio";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
  },
};

export default nextConfig;
