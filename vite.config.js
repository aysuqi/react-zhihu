import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pxtorem from "postcss-pxtorem";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pxtorem({ rootValue: 75, propList: ["*"] })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/zhi": {
        target: "https://news-at.zhihu.com/api/",
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/\/zhi/, ""),
      },
      "/api": {
        target: "http://127.0.0.1:7100",
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/\/api/, ""),
      },
    },
  },
});
