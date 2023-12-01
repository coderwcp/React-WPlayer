// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Desktop/self/React-WPlayer/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.9_@types+node@20.7.0_sass@1.68.0/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Desktop/self/React-WPlayer/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-react@4.1.0_vite@4.4.9/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { createHtmlPlugin } from "file:///D:/Desktop/self/React-WPlayer/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-html@3.2.0_vite@4.4.9/node_modules/vite-plugin-html/dist/index.mjs";
import { VitePWA } from "file:///D:/Desktop/self/React-WPlayer/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pwa@0.16.5_vite@4.4.9_workbox-build@7.0.0_workbox-window@7.0.0/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "D:\\Desktop\\self\\React-WPlayer";
var vite_config_default = defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  return {
    base: "./",
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @import "@/style/respond.scss";
          `
        }
      }
    },
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        template: "index.html",
        inject: {
          data: {
            logo: loadEnv(mode, process.cwd()).VITE_SITE_LOGO,
            appleLogo: loadEnv(mode, process.cwd()).VITE_SITE_APPLE_LOGO,
            title: loadEnv(mode, process.cwd()).VITE_SITE_TITLE,
            author: loadEnv(mode, process.cwd()).VITE_SITE_ANTHOR,
            keywords: loadEnv(mode, process.cwd()).VITE_SITE_KEYWORDS,
            description: loadEnv(mode, process.cwd()).VITE_SITE_DES
          }
        }
      }),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /(.*?)\.(woff2|woff|ttf)/,
              handler: "CacheFirst",
              options: {
                cacheName: "file-cache"
              }
            },
            {
              urlPattern: /(.*?)\.(webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache"
              }
            }
          ]
        },
        manifest: {
          name: viteEnv.VITE_SITE_TITLE,
          short_name: viteEnv.VITE_SITE_TITLE,
          description: viteEnv.VITE_SITE_DES,
          display: "standalone",
          start_url: "/",
          theme_color: "#fff",
          background_color: "#efefef",
          icons: [
            {
              src: "/images/logo/favicon.png",
              sizes: "200x200",
              type: "image/png"
            }
          ]
        }
      })
    ],
    server: {
      host: "0.0.0.0",
      port: 8888,
      open: true,
      proxy: {
        "/api": {
          target: viteEnv.VITE_MUSIC_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    build: {
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"]
        }
      },
      sourcemap: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXNrdG9wXFxcXHNlbGZcXFxcUmVhY3QtV1BsYXllclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRGVza3RvcFxcXFxzZWxmXFxcXFJlYWN0LVdQbGF5ZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0Rlc2t0b3Avc2VsZi9SZWFjdC1XUGxheWVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBDb25maWdFbnYsIFVzZXJDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcblx0Y29uc3Qgdml0ZUVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG5cdHJldHVybiB7XG5cdFx0YmFzZTogXCIuL1wiLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGFsaWFzOiB7XG5cdFx0XHRcdFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcblx0XHRcdFx0XCJ2dWUtaTE4blwiOiBcInZ1ZS1pMThuL2Rpc3QvdnVlLWkxOG4uY2pzLmpzXCJcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNzczoge1xuXHRcdFx0cHJlcHJvY2Vzc29yT3B0aW9uczoge1xuXHRcdFx0XHRzY3NzOiB7XG5cdFx0XHRcdFx0YWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICAgICAgQGltcG9ydCBcIkAvc3R5bGUvcmVzcG9uZC5zY3NzXCI7XG4gICAgICAgICAgYFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRwbHVnaW5zOiBbXG5cdFx0XHRyZWFjdCgpLFxuXHRcdFx0Y3JlYXRlSHRtbFBsdWdpbih7XG5cdFx0XHRcdG1pbmlmeTogdHJ1ZSxcblx0XHRcdFx0dGVtcGxhdGU6IFwiaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRpbmplY3Q6IHtcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRsb2dvOiBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpLlZJVEVfU0lURV9MT0dPLFxuXHRcdFx0XHRcdFx0YXBwbGVMb2dvOiBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpLlZJVEVfU0lURV9BUFBMRV9MT0dPLFxuXHRcdFx0XHRcdFx0dGl0bGU6IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkuVklURV9TSVRFX1RJVExFLFxuXHRcdFx0XHRcdFx0YXV0aG9yOiBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpLlZJVEVfU0lURV9BTlRIT1IsXG5cdFx0XHRcdFx0XHRrZXl3b3JkczogbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX1NJVEVfS0VZV09SRFMsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX1NJVEVfREVTXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KSxcblx0XHRcdFZpdGVQV0Eoe1xuXHRcdFx0XHRyZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuXHRcdFx0XHR3b3JrYm94OiB7XG5cdFx0XHRcdFx0Y2xpZW50c0NsYWltOiB0cnVlLFxuXHRcdFx0XHRcdHNraXBXYWl0aW5nOiB0cnVlLFxuXHRcdFx0XHRcdGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcblx0XHRcdFx0XHRydW50aW1lQ2FjaGluZzogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR1cmxQYXR0ZXJuOiAvKC4qPylcXC4od29mZjJ8d29mZnx0dGYpLyxcblx0XHRcdFx0XHRcdFx0aGFuZGxlcjogXCJDYWNoZUZpcnN0XCIsXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0XHRjYWNoZU5hbWU6IFwiZmlsZS1jYWNoZVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHVybFBhdHRlcm46IC8oLio/KVxcLih3ZWJwfHBuZ3xqcGU/Z3xzdmd8Z2lmfGJtcHxwc2R8dGlmZnx0Z2F8ZXBzKS8sXG5cdFx0XHRcdFx0XHRcdGhhbmRsZXI6IFwiQ2FjaGVGaXJzdFwiLFxuXHRcdFx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FjaGVOYW1lOiBcImltYWdlLWNhY2hlXCJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0bWFuaWZlc3Q6IHtcblx0XHRcdFx0XHRuYW1lOiB2aXRlRW52LlZJVEVfU0lURV9USVRMRSxcblx0XHRcdFx0XHRzaG9ydF9uYW1lOiB2aXRlRW52LlZJVEVfU0lURV9USVRMRSxcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogdml0ZUVudi5WSVRFX1NJVEVfREVTLFxuXHRcdFx0XHRcdGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuXHRcdFx0XHRcdHN0YXJ0X3VybDogXCIvXCIsXG5cdFx0XHRcdFx0dGhlbWVfY29sb3I6IFwiI2ZmZlwiLFxuXHRcdFx0XHRcdGJhY2tncm91bmRfY29sb3I6IFwiI2VmZWZlZlwiLFxuXHRcdFx0XHRcdGljb25zOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHNyYzogXCIvaW1hZ2VzL2xvZ28vZmF2aWNvbi5wbmdcIixcblx0XHRcdFx0XHRcdFx0c2l6ZXM6IFwiMjAweDIwMFwiLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdF0sXG5cdFx0c2VydmVyOiB7XG5cdFx0XHRob3N0OiBcIjAuMC4wLjBcIixcblx0XHRcdHBvcnQ6IDg4ODgsXG5cdFx0XHRvcGVuOiB0cnVlLFxuXHRcdFx0cHJveHk6IHtcblx0XHRcdFx0XCIvYXBpXCI6IHtcblx0XHRcdFx0XHR0YXJnZXQ6IHZpdGVFbnYuVklURV9NVVNJQ19BUEksXG5cdFx0XHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHRcdFx0XHRcdHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YnVpbGQ6IHtcblx0XHRcdG91dERpcjogXCJkaXN0XCIsXG5cdFx0XHRtaW5pZnk6IFwidGVyc2VyXCIsXG5cdFx0XHR0ZXJzZXJPcHRpb25zOiB7XG5cdFx0XHRcdGNvbXByZXNzOiB7XG5cdFx0XHRcdFx0cHVyZV9mdW5jczogW1wiY29uc29sZS5sb2dcIl1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNvdXJjZW1hcDogZmFsc2UsXG5cdFx0XHQvLyBcdTg5QzRcdTVCOUFcdTg5RTZcdTUzRDFcdThCNjZcdTU0NEFcdTc2ODQgY2h1bmsgXHU1OTI3XHU1QzBGXG5cdFx0XHRjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG5cdFx0XHQvLyBcdTc5ODFcdTc1MjggZ3ppcCBcdTUzOEJcdTdGMjlcdTU5MjdcdTVDMEZcdTYyQTVcdTU0NEFcdUZGMENcdTUzRUZcdTc1NjVcdTVGQUVcdTUxQ0ZcdTVDMTFcdTYyNTNcdTUzMDVcdTY1RjZcdTk1RjRcblx0XHRcdHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdFx0bWFudWFsQ2h1bmtzKGlkKSB7XG5cdFx0XHRcdFx0XHRpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFwidmVuZG9yXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyBTdGF0aWMgcmVzb3VyY2UgY2xhc3NpZmljYXRpb24gYW5kIHBhY2thZ2luZ1xuXHRcdFx0XHRcdGNodW5rRmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG5cdFx0XHRcdFx0ZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcblx0XHRcdFx0XHRhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVIsU0FBUyxjQUFxQyxlQUFlO0FBQzlVLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxlQUFlO0FBSnhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUE2QjtBQUNoRSxRQUFNLFVBQVUsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQzNDLFNBQU87QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNSLE9BQU87QUFBQSxRQUNOLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDL0IsWUFBWTtBQUFBLE1BQ2I7QUFBQSxJQUNEO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSixxQkFB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
