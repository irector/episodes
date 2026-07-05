import { defineConfig } from "vite";
import { resolve } from "path";

const base = "/episodes/";

export default defineConfig({
  base,
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        baby: resolve(__dirname, "baby-tvij-vykhid/index.html"),
        sexKyiv: resolve(__dirname, "sex-kyiv/index.html"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$asset-base: '${base}';`,
      },
    },
  },
});
