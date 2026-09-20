<script lang="ts">
    let count = $state(0);
</script>

<div class="flex flex-wrap items-center gap-5">
    <button
        type="button"
        class="inline-flex cursor-pointer items-center gap-3 rounded-full bg-stone-900 px-6 py-3 font-mono text-sm text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
        onclick={() => (count += 1)}
    >
        <span class="i-lucide-plus size-4" aria-hidden="true"></span>
        Add one
    </button>
    <output class="font-mono text-sm" aria-live="polite" aria-atomic="true">
        Count: {count}
    </output>
</div>
