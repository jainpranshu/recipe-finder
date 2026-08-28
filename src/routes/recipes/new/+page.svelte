<script lang="ts">
  import { goto } from '$app/navigation';
  import RecipeForm from '$lib/components/RecipeForm.svelte';
  import { userRecipesStore } from '$lib/stores/userRecipes.svelte';
  import type { RecipeFormValues } from '$lib/validation/recipe';

  function handleSubmit(values: RecipeFormValues) {
    const recipe = userRecipesStore.create({
      title: values.title.trim(),
      image: values.image.trim(),
      category: values.category.trim() || undefined,
      area: values.area.trim() || undefined,
      difficulty: values.difficulty,
      instructions: values.instructions.trim(),
      ingredients: values.ingredients.filter((i) => i.name.trim())
    });
    goto(`/recipes/${recipe.id}`);
  }
</script>

<h1>Add a Recipe</h1>
<RecipeForm onSubmit={handleSubmit} submitLabel="Create recipe" />
