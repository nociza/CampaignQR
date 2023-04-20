import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [reactRefresh()],
  root: "src",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your backend server URL
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../dist",
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
