import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import Pages from "vite-plugin-pages";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Inspect from "vite-plugin-inspect";
import hljs from "highlight.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true })
                  .value +
                "</code></pre>"
              );
            } catch (__) {}
          }
          return "";
        },
      },
    }),
    Pages({
      pagesDir: [
        {
          dir: "src/views",
          baseRoute: "",
        },
      ],
      exclude: ["**/components/*.vue"],
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver({ importStyle: "sass" }),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      dts: path.resolve(__dirname, "types/auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: "sass" }),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
      dts: path.resolve(__dirname, "types/components.d.ts"),
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://xxxxxxxxxxxxxxx",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/element.scss" as *;
          @use "@/styles/variables.scss";
          `,
      },
    },
  },
});
