import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import { site } from './src/config/site';

const deploymentUrl = new URL(site.url);
const base = deploymentUrl.pathname.replace(/\/$/, '');

export default defineConfig({
    site: deploymentUrl.origin,
    base: base || '/',
    trailingSlash: 'always',
    redirects: { '/': { status: 301, destination: `${base}/sr/` } },
    integrations: [svelte(), UnoCSS()],
});
