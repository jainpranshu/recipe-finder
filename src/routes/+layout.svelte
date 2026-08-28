<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  let { children } = $props();
</script>

<Header />

<main>
  {@render children()}
</main>

<style>
  main { max-width: 1100px; margin: 0 auto; padding: 1.5rem; }
</style>
