import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/animeStudio/",
  plugins: [react()],
  server: { fs: { allow: ["../.."] } },
});
