import type { NextConfig } from "next";

// GitHub Pages는 https://<아이디>.github.io/mylink/ 아래에서 열리므로
// 배포 빌드에서만 basePath를 /mylink로 둔다. 로컬 개발(npm run dev)은 / 그대로.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
