<script lang="ts">
  import type { PageProps } from './$types';
  import FavoriteButton from '$lib/components/FavoriteButton.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import { userRecipesStore } from '$lib/stores/userRecipes.svelte';
  import { goto } from '$app/navigation';

  let { data }: PageProps = $props();
  let recipe = $derived(data.recipe ?? userRecipesStore.get(data.id));
  let confirmingDelete = $state(false);

  let steps = $derived(
    recipe ? recipe.instructions.split(/\r?\n/).map((s) => s.trim()).filter(Boolean) : []
  );

  function handleDelete() {
    if (!recipe) return;
    userRecipesStore.remove(recipe.id);
    goto('/');
  }
</script>

<svelte:head>
  <title>{recipe ? `${recipe.title} — Recipe Finder` : 'Recipe Finder'}</title>
</svelte:head>

{#if !recipe}
  <p class="not-found">Recipe not found.</p>
{:else}
  <a class="back" href="/">&larr; Back to discovery</a>

  <article class="recipe">
    <img src={recipe.image} alt={recipe.title} />

    <div class="header">
      <div class="title-row">
        <h1>{recipe.title}</h1>
        <FavoriteButton {recipe} />
      </div>
      <div class="meta">
        {#if recipe.category}<span class="pill">{recipe.category}</span>{/if}
        {#if recipe.area}<span class="pill">{recipe.area}</span>{/if}
        {#if recipe.difficulty}<span class="pill">{recipe.difficulty}</span>{/if}
      </div>
      {#if recipe.source === 'user'}
        <div class="owner-actions">
          <a href={`/recipes/${recipe.id}/edit`}>Edit</a>
          <button onclick={() => (confirmingDelete = true)}>Delete</button>
        </div>
      {/if}
    </div>

    <div class="sections">
      <section>
        <h2>Ingredients</h2>
        <ul>
          {#each recipe.ingredients as ing}
            <li><span class="measure">{ing.measure}</span> {ing.name}</li>
          {/each}
        </ul>
      </section>
      <section>
        <h2>Instructions</h2>
        <ol>
          {#each steps as step}<li>{step}</li>{/each}
        </ol>
      </section>
    </div>
  </article>

  <ConfirmDialog
    open={confirmingDelete}
    title="Delete this recipe?"
    message={`"${recipe.title}" will be permanently removed.`}
    onConfirm={handleDelete}
    onCancel={() => (confirmingDelete = false)}
  />
{/if}

<style>
  .back { display: inline-block; margin-bottom: 1rem; color: #555; text-decoration: none; }
  .back:hover { text-decoration: underline; }
  .recipe { display: flex; flex-direction: column; gap: 1.5rem; }
  .recipe img { width: 100%; max-height: 360px; object-fit: cover; border-radius: 12px; }
  .header h1 { margin: 0 0 0.5rem; }
  .title-row { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
  .meta { display: flex; gap: 0.5rem; }
  .pill { font-size: 0.8rem; background: #f2f2f2; padding: 0.2rem 0.6rem; border-radius: 999px; color: #555; text-transform: capitalize; }
  .owner-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; font-size: 0.9rem; }
  .owner-actions button { border: none; background: transparent; color: #b3261e; cursor: pointer; padding: 0; font-size: inherit; }
  .owner-actions a { color: #2563eb; }
  h2 { font-size: 1.1rem; margin-bottom: 0.5rem; }
  .sections { display: grid; gap: 1.5rem; }
  section ul { list-style: none; padding: 0; display: grid; gap: 0.35rem; }
  .measure { color: #777; display: inline-block; min-width: 90px; }
  section ol { padding-left: 1.25rem; display: grid; gap: 0.6rem; }
  .not-found { padding: 3rem 1rem; text-align: center; color: #777; }
  @media (min-width: 700px) { .sections { grid-template-columns: 1fr 1fr; } }
</style>
