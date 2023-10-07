import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const viteEnv = loadEnv(mode, process.cwd());
	return {
		base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
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
					rewrite: path => path.replace(/^\/api/, "")
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
			chunkSizeWarningLimit: 2000,
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
