import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import { site } from './src/config/site';

export default defineConfig({
    site: site.url,
    trailingSlash: 'always',
    redirects: { '/': { status: 301, destination: '/sr/' } },
    integrations: [svelte(), UnoCSS()],
});
