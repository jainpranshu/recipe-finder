<script lang="ts">
  import type { Recipe } from '$lib/types';
  import { validateRecipe, type RecipeFormValues, type ValidationErrors } from '$lib/validation/recipe';

  let {
    initial,
    onSubmit,
    submitLabel = 'Save recipe'
  }: {
    initial?: Recipe;
    onSubmit: (values: RecipeFormValues) => void;
    submitLabel?: string;
  } = $props();

  let title = $state(initial?.title ?? '');
  let image = $state(initial?.image ?? '');
  let category = $state(initial?.category ?? '');
  let area = $state(initial?.area ?? '');
  let difficulty = $state<'easy' | 'medium' | 'hard'>(initial?.difficulty ?? 'easy');
  let instructions = $state(initial?.instructions ?? '');
  let ingredients = $state(
    initial?.ingredients?.length ? [...initial.ingredients] : [{ name: '', measure: '' }]
  );
  let errors = $state<ValidationErrors>({});

  function addIngredientRow() {
    ingredients.push({ name: '', measure: '' });
  }

  function removeIngredientRow(index: number) {
    ingredients.splice(index, 1);
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const values: RecipeFormValues = { title, image, category, area, difficulty, ingredients, instructions };
    errors = validateRecipe(values);
    if (Object.keys(errors).length === 0) onSubmit(values);
  }
</script>

<form onsubmit={handleSubmit}>
  <label>
    Title
    <input type="text" bind:value={title} />
    {#if errors.title}<span class="error">{errors.title}</span>{/if}
  </label>

  <label>
    Image URL
    <input type="text" bind:value={image} placeholder="https://…" />
    {#if errors.image}<span class="error">{errors.image}</span>{/if}
  </label>

  <div class="row">
    <label>Category<input type="text" bind:value={category} placeholder="e.g. Chicken" /></label>
    <label>Area / cuisine<input type="text" bind:value={area} placeholder="e.g. Italian" /></label>
    <label>
      Difficulty
      <select bind:value={difficulty}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </label>
  </div>

  <fieldset>
    <legend>Ingredients</legend>
    {#each ingredients as ingredient, i}
      <div class="ingredient-row">
        <input type="text" placeholder="Ingredient" bind:value={ingredient.name} />
        <input type="text" placeholder="Amount" bind:value={ingredient.measure} />
        <button type="button" onclick={() => removeIngredientRow(i)} aria-label="Remove ingredient">✕</button>
      </div>
    {/each}
    <button type="button" class="add-row" onclick={addIngredientRow}>+ Add ingredient</button>
    {#if errors.ingredients}<span class="error">{errors.ingredients}</span>{/if}
  </fieldset>

  <label>
    Instructions
    <textarea rows="6" bind:value={instructions} placeholder="One step per line…"></textarea>
    {#if errors.instructions}<span class="error">{errors.instructions}</span>{/if}
  </label>

  <button type="submit" class="submit">{submitLabel}</button>
</form>

<style>
  form { display: grid; gap: 1.1rem; max-width: 640px; }
  label { display: grid; gap: 0.3rem; font-size: 0.9rem; color: #444; }
  input, textarea, select { padding: 0.5rem 0.65rem; border: 1px solid #d0d0d0; border-radius: 6px; font-size: 1rem; font-family: inherit; }
  .row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; }
  fieldset { border: 1px solid #e5e5e5; border-radius: 8px; padding: 1rem; display: grid; gap: 0.6rem; }
  legend { font-size: 0.85rem; color: #555; padding: 0 0.3rem; }
  .ingredient-row { display: grid; grid-template-columns: 2fr 1fr auto; gap: 0.5rem; align-items: center; }
  .ingredient-row button { border: none; background: #f2f2f2; border-radius: 6px; width: 2rem; height: 2.1rem; cursor: pointer; color: #888; }
  .add-row { justify-self: start; border: none; background: transparent; color: #2563eb; cursor: pointer; font-size: 0.85rem; padding: 0; }
  .error { color: #b3261e; font-size: 0.8rem; }
  .submit { justify-self: start; padding: 0.6rem 1.4rem; border: none; border-radius: 8px; background: #1a1a1a; color: white; font-size: 0.95rem; cursor: pointer; }
</style>
