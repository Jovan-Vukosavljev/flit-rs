import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => {
    const urls = ['sr', 'en']
        .map(
            (locale) =>
                `<url><loc>${site.url}/${locale}/</loc><xhtml:link rel="alternate" hreflang="sr" href="${site.url}/sr/"/><xhtml:link rel="alternate" hreflang="en" href="${site.url}/en/"/><xhtml:link rel="alternate" hreflang="x-default" href="${site.url}/sr/"/></url>`,
        )
        .join('');
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
        { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
    );
};
