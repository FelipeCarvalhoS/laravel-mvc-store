import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { google } from 'laravel-vite-plugin/fonts';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            assets: ['resources/img/**'],
            refresh: true,
            fonts: [
                google('Outfit', {
                    weights: [400, 500, 600, 700],
                    fallbacks: ['sans-serif'],
                }),
                google('Barlow', {
                    weights: [400, 500, 600, 700],
                    fallbacks: ['sans-serif'],
                }),
            ],
        }),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    'import',
                    'mixed-decls',
                    'color-functions',
                    'global-builtin',
                ],
            },
        },
    },
});
