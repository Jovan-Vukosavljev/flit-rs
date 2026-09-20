# FLIT Support

A bilingual business landing page built with Astro, Svelte 5, strict TypeScript and UnoCSS Wind4. Serbian Latin lives at `/sr/`, English at `/en/`, and `/` redirects to Serbian. Both pages use the same components and typed translation dictionaries.

## Development

```sh
bun install
bun run dev
```

Open http://localhost:4321/sr/. If Bun is not on your PATH, use `~/.bun/bin/bun`.

| Command                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `bun run dev`          | Start the development server                     |
| `bun run check`        | Astro, Svelte and TypeScript checks              |
| `bun run lint`         | Biome lint and import checks                     |
| `bun run format`       | Format with Prettier                             |
| `bun run format:check` | Check formatting                                 |
| `bun run build`        | Type-check and generate static output in `dist/` |
| `bun run preview`      | Preview the production build                     |
| `bun run test`         | Build and run browser tests with Bun             |

## Edit business details

All contact details and asset paths are in `src/config/site.ts`. Replace `null` with the confirmed phone number and email:

```ts
phone: '+381 11 123 4567',
email: 'your-confirmed-address@example.com',
```

These are examples, not FLIT contact details. Real values enable `tel:` and `mailto:` links and enter the organization structured data. Unset details appear as non-clickable placeholders and are excluded from structured data. Update the Serbian and English `coverage` strings once on-site coverage is confirmed. Keep `url` as the final HTTPS domain without a trailing slash.

All copy, service descriptions, FAQs, metadata and control labels are in `src/i18n/index.ts`. The Serbian and English dictionaries follow the same `Copy` interface. Content is editable draft copy: confirm the service descriptions and replace contact placeholders before publishing. The site makes no response-time, certification or geographical coverage claims.

## Images and theme

- The original FLIT logo is stored locally at `public/images/flit-logo.png`. Its light backing preserves contrast in both themes.
- To replace the drone placeholder, add an optimized image to `public/images/`, set `droneImage` to its path such as `/images/aerial-project.webp`, and update both `droneImageAlt` strings. Use imagery you have permission to publish. The image fills a 1.2:1 frame with `object-fit: cover`; its loading is deferred.
- Replace `public/images/social-preview.png` for the social sharing card, keeping it 1200 × 630. The matching SVG is an editable source asset.
- Theme tokens and shared layout styles are in `src/layouts/Layout.astro`; components hold their own scoped styles. Manrope is served locally, with no external font requests.
- Dark mode is the default even if the operating system prefers light. A selected theme is stored under `flit-theme` and restored before first paint. Storage failures do not prevent theme changes.

## Testing

Install the Chromium test browser once:

```sh
bunx playwright install chromium
bun run test
```

Bun runs the tests; Playwright drives Chromium against a temporary production preview on port 4325. Tests cover both languages, both themes, widths of 375, 768 and 1440 pixels, axe accessibility checks, metadata, anchor links, contact placeholders, the root redirect, keyboard interaction, persistence, blocked storage, reduced motion, and native navigation without JavaScript. After a build, `bun test` runs the suite directly.

## Hosting and redirects

Deploy the static `dist/` directory. No server runtime, CMS, form service or analytics is required. `public/_redirects` provides permanent redirects for hosts supporting that format. On other hosts, configure these at the web server or CDN:

| Old URL                                  | Destination     | Status |
| ---------------------------------------- | --------------- | ------ |
| `/`                                      | `/sr/`          | 301    |
| `/index.php/rs`                          | `/sr/`          | 301    |
| `/index.php/rs/it-usluge`                | `/sr/#services` | 301    |
| `/index.php/rs/it-usluge/it-podrska`     | `/sr/#services` | 301    |
| `/index.php/rs/it-usluge/it-outsourcing` | `/sr/#services` | 301    |
| `/index.php/rs/drone-usluge`             | `/sr/#drone`    | 301    |

Astro also generates a static meta-refresh fallback for `/`. A static HTML fallback is not an HTTP 301. The deployed host must apply the redirect rules to supply that status; ensure the root rule takes precedence over `index.html`. Verify after deployment:

```sh
curl -I https://flit.rs/
curl -I https://flit.rs/index.php/rs/it-usluge/it-podrska
```

The first response should be `301` with `Location: /sr/`. Use a listed legacy URL to verify each migration rule. Deployment and production HTTP verification are separate from this implementation.

Search metadata, organization JSON-LD, `/sitemap.xml` and `/robots.txt` are generated from the same domain configuration. Both languages have self-canonical URLs and reciprocal language alternates; `x-default` points to Serbian. There is no automatic browser-language redirect.
