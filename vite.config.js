import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://guy-electronics-balloon-angle.trycloudflare.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
