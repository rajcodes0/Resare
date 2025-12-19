import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [
    svgr(),          // 👈 MUST come first
    react(),
    tailwindcss(),
    flowbiteReact(),
  ],
});
