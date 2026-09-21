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

Contact details are in `src/config/site.ts`; image imports and alt text are in `src/config/images.ts`. Replace `null` with the confirmed phone number and email:

```ts
phone: '+381 11 123 4567',
email: 'your-confirmed-address@example.com',
```

These are examples, not FLIT contact details. Real values enable `tel:` and `mailto:` links and enter the organization structured data. Unset details appear as non-clickable placeholders and are excluded from structured data. Update the Serbian and English `coverage` strings once on-site coverage is confirmed. Keep `url` as the final HTTPS domain without a trailing slash.

All copy, service descriptions, FAQs, metadata and control labels are in `src/i18n/index.ts`. The Serbian and English dictionaries follow the same `Copy` interface. Content is editable draft copy: confirm the service descriptions and replace contact placeholders before publishing. The site makes no response-time, certification or geographical coverage claims.

## Images and theme

- Image sources live in `src/assets/`. The header and footer use Astro's `<Image>` to generate appropriately sized WebP logos with transparent backgrounds. `public/favicon.png` and `public/apple-touch-icon.png` are the icons from the original FLIT site.
- To replace the drone image, add the source to `src/assets/` and update its import in `src/config/images.ts`, along with both `droneImageAlt` strings. Set `droneImage` to `null` to restore the placeholder. Use imagery you have permission to publish; the current generated image is illustrative, not a completed FLIT project.
- The drone section uses Astro's `<Picture>` to generate responsive AVIF and WebP images with JPEG fallbacks during `bun run build`. Its `srcset` and `sizes` let the browser choose a suitable resolution. The image fills a 1.2:1 frame with `object-fit: cover` and loads lazily. Optimized files are emitted under `dist/_astro/`.
- Replace `public/images/social-preview.png` for the social sharing card, keeping it 1200 × 630. The matching SVG is an editable source asset.
- Theme tokens and shared layout styles are in `src/layouts/Layout.astro`; components hold their own scoped styles. Manrope is served locally, with no external font requests.
- Font faces live in `src/styles/fonts.css`. The layout preloads Latin on both routes and Latin Extended for Serbian diacritics. `font-display: optional` prevents a late font swap: if a font is too slow, the browser keeps the fallback for that visit instead of shifting the text. Later navigations can use the cached Manrope font.
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

## GitHub Pages releases

The public repository is `Jovan-Vukosavljev/flit-rs`. `.github/workflows/deploy.yml` deploys to GitHub Pages only when a tag matching `v*` is pushed. It installs locked dependencies with Bun, checks lint and formatting, builds the site, and deploys `dist/` with the official Pages actions.

Publish a release from the intended commit:

```sh
git push origin main
git tag v0.1.1
git push origin v0.1.1
```

Use a new version tag for later releases. Pushing `main` alone does not deploy.

After Pages deploys successfully, a separate job builds with `SITE_URL=https://flit.rs` and publishes a GitHub Release for the same tag with `flit.rs.zip` attached. This archive contains the compiled site at its root, with `/sr/`, `/en/`, and assets using domain-root paths. Canonical URLs, language alternates, structured data, and the sitemap point to `https://flit.rs`.

Download `flit.rs.zip` from the release and extract its contents into the flit.rs web root. No server-side JavaScript runtime is required. Configure the host's permanent redirects as described above. Creating the release does not upload files to the flit.rs server or change DNS. Re-running a release job replaces the archive attached to that tag.

Pages must use **GitHub Actions** as its build source. The `github-pages` environment must allow `v*` tags to deploy. The workflow obtains the site URL from GitHub Pages and passes it as `SITE_URL`, so the site, language links, metadata, images and fonts work at `https://jovan-vukosavljev.github.io/flit-rs/`.

To reproduce that build locally:

```sh
SITE_URL=https://jovan-vukosavljev.github.io/flit-rs bun run build
```

Without `SITE_URL`, development uses root paths and metadata defaults to `https://flit.rs`. No custom domain or DNS changes are needed for the GitHub Pages deployment. GitHub Pages does not process `_redirects`; the site root uses Astro's static redirect page to reach Serbian. Legacy PHP redirects require separate server/CDN configuration if the original domain is migrated later.
