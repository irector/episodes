import { defineConfig } from "vite";

const base = "/episodes/";

export default defineConfig({
  base,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$asset-base: '${base}';`,
      },
    },
  },
});
