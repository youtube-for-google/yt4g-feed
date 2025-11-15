import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

console.log("⚙️  Loading Vite Federation Plugin...");

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "yt4g_feed",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/FeedApp.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 4001,
  },
  preview: {
    port: 4001,
  },
});
