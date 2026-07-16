import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { google } from "laravel-vite-plugin/fonts";
import react from "@vitejs/plugin-react";
import inertia from "@inertiajs/vite";
import { fileURLToPath, URL } from "node:url";
import { wayfinder } from "@laravel/vite-plugin-wayfinder";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources", import.meta.url)),
        },
    },
    plugins: [
        laravel({
            input: ["resources/js/app.tsx"],
            assets: ["resources/img/**"],
            refresh: true,
            fonts: [
                google("Outfit", {
                    weights: [400, 500, 600, 700],
                    fallbacks: ["sans-serif"],
                }),
                google("Barlow", {
                    weights: [400, 500, 600, 700],
                    fallbacks: ["sans-serif"],
                }),
            ],
        }),
        inertia(),
        react(),
        wayfinder(),
    ],
    server: {
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    "import",
                    "mixed-decls",
                    "color-functions",
                    "global-builtin",
                ],
            },
        },
    },
});
