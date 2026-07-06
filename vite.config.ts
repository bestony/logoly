import { cloudflare } from "@cloudflare/vite-plugin";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig(({ mode }) => {
	const isTest = mode === "test" || process.env.VITEST === "true";

	return {
		resolve: { tsconfigPaths: true },
		plugins: [
			paraglideVitePlugin({
				project: "./project.inlang",
				outdir: "./src/paraglide",
			}),
			devtools(),
			...(isTest ? [] : [cloudflare({ viteEnvironment: { name: "ssr" } })]),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
	};
});

export default config;
