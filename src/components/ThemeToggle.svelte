<script lang="ts">
    import { onMount } from 'svelte';

    let { labels }: { labels: { light: string; dark: string } } = $props();
    let theme = $state('dark');
    let ready = $state(false);
    onMount(() => {
        theme = document.documentElement.dataset.theme ?? 'dark';
        ready = true;
    });
    function toggleTheme() {
        theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem('flit-theme', theme);
        } catch {
            // The selected theme still works when storage is unavailable
        }
    }
</script>

<button
    type="button"
    class={['theme-toggle', { ready }]}
    aria-label={theme === 'dark' ? labels.light : labels.dark}
    title={theme === 'dark' ? labels.light : labels.dark}
    onclick={toggleTheme}
>
    <span
        class={theme === 'dark' ? 'i-lucide-sun size-4' : 'i-lucide-moon size-4'}
        aria-hidden="true"
    ></span>
</button>

<style>
    .theme-toggle {
        visibility: hidden;
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        border: 1px solid var(--line);
        border-radius: 50%;
        color: var(--text);
        cursor: pointer;
        background: transparent;
        transition: background 160ms;
    }
    .ready {
        visibility: visible;
    }
    .theme-toggle:hover {
        background: var(--surface-raised);
    }
</style>
