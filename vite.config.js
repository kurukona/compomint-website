import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // 프로젝트 루트 디렉토리
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 3100,
    open: false, // 서버 시작 시 브라우저 자동 열기
    cors: true,
    host: true, // 네트워크 접근 허용
    // 개발 환경에서 404 페이지 처리
    middlewareMode: false,
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "./index.html",
        "404": "./404.html",
        docs: "./docs.html",
        examples: "./examples.html",
        tutorial: "./tutorial.html",
      },
    },
  },
  publicDir: "public", // img, css 등을 직접 관리하므로 false로 설정

  // 개발 서버에서 HTML 파일들이 올바르게 서빙되도록 설정
  define: {
    global: "globalThis",
  },

  // 플레이그라운드에서 iframe을 위한 CORS 설정
  optimizeDeps: {
    exclude: [],
  },

  // 정적 파일 처리
  assetsInclude: [
    "**/*.svg",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.webp",
  ],

  plugins: [],
});
