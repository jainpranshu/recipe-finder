<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import RecipeForm from '$lib/components/RecipeForm.svelte';
  import { userRecipesStore } from '$lib/stores/userRecipes.svelte';
  import type { RecipeFormValues } from '$lib/validation/recipe';

  let { data }: PageProps = $props();
  let existing = $derived(userRecipesStore.get(data.id));

  function handleSubmit(values: RecipeFormValues) {
    userRecipesStore.update(data.id, {
      title: values.title.trim(),
      image: values.image.trim(),
      category: values.category.trim() || undefined,
      area: values.area.trim() || undefined,
      difficulty: values.difficulty,
      instructions: values.instructions.trim(),
      ingredients: values.ingredients.filter((i) => i.name.trim())
    });
    goto(`/recipes/${data.id}`);
  }
</script>

{#if existing}
  <h1>Edit Recipe</h1>
  <RecipeForm initial={existing} onSubmit={handleSubmit} submitLabel="Save changes" />
{:else}
  <p>Recipe not found.</p>
{/if}
