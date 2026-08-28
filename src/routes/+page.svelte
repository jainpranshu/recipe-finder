<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let searchValue = $state(data.query);
  let debounceTimer: ReturnType<typeof setTimeout>;

  function onSearchInput(value: string) {
    searchValue = value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const url = new URL(page.url);
      value ? url.searchParams.set('q', value) : url.searchParams.delete('q');
      url.searchParams.delete('category');
      goto(url, { keepFocus: true, replaceState: true, noScroll: true });
    }, 400);
  }

  function onSelectCategory(category: string) {
    const url = new URL(page.url);
    category ? url.searchParams.set('category', category) : url.searchParams.delete('category');
    url.searchParams.delete('q');
    goto(url);
  }
</script>

<h1>Discover Recipes</h1>

<div class="controls">
  <input
    type="search"
    placeholder="Search recipes…"
    value={searchValue}
    oninput={(e) => onSearchInput(e.currentTarget.value)}
  />
  <select value={data.category} onchange={(e) => onSelectCategory(e.currentTarget.value)}>
    <option value="">All categories</option>
    {#each data.categories as category}
      <option value={category}>{category}</option>
    {/each}
  </select>
</div>

{#if data.error}
  <p class="error">{data.error}</p>
{:else if data.recipes.length === 0}
  <p class="empty">No recipes found. Try a different search or category.</p>
{:else}
  <div class="grid">
    {#each data.recipes as recipe (recipe.id)}
      <RecipeCard {recipe} />
    {/each}
  </div>
{/if}

<style>
  .controls { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
  input, select { padding: 0.5rem 0.75rem; border: 1px solid #d0d0d0; border-radius: 6px; font-size: 1rem; }
  input { flex: 1; min-width: 200px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
  .empty, .error { color: #777; padding: 2rem 0; }
  .error { color: #b3261e; }
</style>
