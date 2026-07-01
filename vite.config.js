import { defineConfig } from "vite";

const base = "/episodes/";

export default defineConfig({
  base,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$asset-base: '${base}';`,
      },
    },
  },
});
