<script lang="ts">
  import '@jainpranshu/recipe-ui-kit/ui-dialog';
  import type { RecipeSummary } from '$lib/types';
  import { favoritesStore } from '$lib/stores/favorites.svelte';
  import { userRecipesStore } from '$lib/stores/userRecipes.svelte';

  let {
    open,
    onPick,
    onClose
  }: { open: boolean; onPick: (recipe: RecipeSummary) => void; onClose: () => void } = $props();

  let options = $derived.by(() => {
    const seen = new Map<string, RecipeSummary>();
    for (const r of favoritesStore.all) seen.set(r.id, r);
    for (const r of userRecipesStore.all) seen.set(r.id, r);
    return [...seen.values()];
  });
</script>

<ui-dialog {open} dialog-title="Choose a recipe" ondialogClose={onClose}>
  {#if options.length === 0}
    <p class="empty">Favorite or create a recipe first — that's what shows up here.</p>
  {:else}
    <ul class="options">
      {#each options as recipe (recipe.id)}
        <li>
          <button onclick={() => onPick(recipe)}>
            <img src={recipe.image} alt={recipe.title} />
            <span>{recipe.title}</span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</ui-dialog>

<style>
  .empty { color: #777; font-size: 0.9rem; }
  .options { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; max-height: 320px; overflow-y: auto; }
  .options button { width: 100%; display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem; border: 1px solid #eee; border-radius: 8px; background: white; cursor: pointer; text-align: left; }
  .options button:hover { background: #f7f7f7; }
  .options img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
</style>
