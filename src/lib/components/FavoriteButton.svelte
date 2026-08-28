<script lang="ts">
  import type { RecipeSummary } from '$lib/types';
  import { favoritesStore } from '$lib/stores/favorites.svelte';

  let { recipe }: { recipe: RecipeSummary } = $props();
  let active = $derived(favoritesStore.has(recipe.id));
</script>

<button
  class="fav-btn"
  class:active
  aria-pressed={active}
  aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
  onclick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesStore.toggle(recipe);
  }}
>
  {active ? '♥' : '♡'}
</button>

<style>
  .fav-btn { border: none; background: white; border-radius: 50%; width: 2rem; height: 2rem; font-size: 1.1rem; line-height: 1; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.15); color: #999; }
  .fav-btn.active { color: #e0245e; }
</style>
