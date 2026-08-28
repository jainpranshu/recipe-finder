<script lang="ts">
  import { userRecipesStore } from '$lib/stores/userRecipes.svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
</script>

<div class="page-header">
  <h1>My Recipes</h1>
  <a class="new-btn" href="/recipes/new">+ New Recipe</a>
</div>

{#if userRecipesStore.all.length === 0}
  <p class="empty">You haven't added any recipes yet.</p>
{:else}
  <div class="grid">
    {#each userRecipesStore.all as recipe (recipe.id)}
      <RecipeCard {recipe} />
    {/each}
  </div>
{/if}

<style>
  .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
  .new-btn { background: #1a1a1a; color: white; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none; font-size: 0.9rem; }
  .empty { color: #777; padding: 2rem 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
</style>
