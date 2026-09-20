# Flit

Astro with Svelte, UnoCSS Wind4, Iconify icons, and strict TypeScript. Bun manages dependencies and scripts.

```sh
bun install
bun run dev
```

Open http://localhost:4321.

| Command                | Purpose                             |
| ---------------------- | ----------------------------------- |
| `bun run dev`          | Start the development server        |
| `bun run check`        | Check Astro, Svelte, and TypeScript |
| `bun run build`        | Run checks and build into `dist/`   |
| `bun run preview`      | Preview the production build        |
| `bun run lint`         | Run Biome lint and import checks    |
| `bun run lint:fix`     | Apply Biome fixes                   |
| `bun run format`       | Format with Prettier                |
| `bun run format:check` | Check formatting                    |

Pages live in `src/pages/`. Shared layouts live in `src/layouts/`. The example in `src/components/Counter.svelte` uses Svelte 5 runes and is hydrated with `client:load`.

UnoCSS is configured in `uno.config.ts` with the Wind4 preset and its CSS reset. Use utility classes in Astro and Svelte files.

Iconify's Lucide collection is installed locally. Add an icon with a static class such as `i-lucide-plus` and a size such as `size-4`. The icons are generated as CSS at build time without runtime API requests. Decorative icons should have `aria-hidden="true"`; icon-only buttons need an accessible label.

TypeScript extends `astro/tsconfigs/strict` and also enables `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and JavaScript checking. Use `<script lang="ts">` in Svelte components.

Development settings follow `personal-website`: Biome handles linting and import organization, while Prettier formats Astro and Svelte with four-space indentation and single quotes. VS Code recommends the matching extensions and formats on save. UnoCSS scans Svelte files explicitly and applies the shared icon scale and alignment defaults.

Integration references: [Astro + Svelte](https://docs.astro.build/en/guides/integrations-guide/svelte/), [UnoCSS + Astro](https://unocss.dev/integrations/astro), [Wind4](https://unocss.dev/presets/wind4), and [Iconify through UnoCSS](https://unocss.dev/presets/icons).
