<script lang="ts">
  import { favoritesStore } from '$lib/stores/favorites.svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
</script>

<h1>Your Favorites</h1>

{#if favoritesStore.all.length === 0}
  <p class="empty">No favorites yet — heart a recipe on the discovery page to save it here.</p>
{:else}
  <div class="grid">
    {#each favoritesStore.all as recipe (recipe.id)}
      <RecipeCard {recipe} />
    {/each}
  </div>
{/if}

<style>
  .empty { color: #777; padding: 2rem 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
</style>
