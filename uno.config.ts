import { defineConfig, presetIcons, presetWind4 } from 'unocss';

export default defineConfig({
    content: {
        filesystem: ['src/**/*.svelte'],
    },
    presets: [
        presetWind4({ preflights: { reset: true, theme: true } }),
        presetIcons({
            scale: 1.2,
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
            collections: {
                lucide: () =>
                    import('@iconify-json/lucide/icons.json').then(
                        (module) => module.default,
                    ),
            },
        }),
    ],
});
