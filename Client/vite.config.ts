import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import path from "path";
import { fileURLToPath } from "url";
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: "optimize-images",
      async transform(src, id) {
        if (/\.(jpe?g|png|webp)$/.test(id)) {
          const buffer = await sharp(src)
            .resize(800) // Ajusta según necesidades
            .webp({ quality: 80 }) // Conversión a WebP
            .toBuffer();
          return `export default ${JSON.stringify(buffer.toString("base64"))}`;
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Apunta a la carpeta `src`
    },
  },
  server: {
    proxy: {
      "/api/hotels": {
        target: "https://api.test.hotelbeds.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/hotels/, "/hotel-content-api/1.0/hotels"),
      },
    },
  },
});
