<script lang="ts">
  import '@jainpranshu/recipe-ui-kit/day-slot';
  import type { RecipeSummary } from '$lib/types';
  import type { Day } from '$lib/days';
  import { mealPlanStore } from '$lib/stores/mealPlan.svelte';
  import RecipePicker from '$lib/components/RecipePicker.svelte';

  let pickerOpenForDay = $state<Day | null>(null);

  function handlePick(recipe: RecipeSummary) {
    if (pickerOpenForDay) mealPlanStore.assign(pickerOpenForDay, recipe);
    pickerOpenForDay = null;
  }
</script>

<h1>Weekly Meal Planner</h1>
<p class="subtitle">Assign a recipe to each day — pulled from your favorites and your own recipes.</p>

<div class="grid">
  {#each mealPlanStore.days as day}
    {@const recipe = mealPlanStore.recipeFor(day)}
    <day-slot
      day={day}
      recipe-title={recipe?.title}
      recipe-image={recipe?.image}
      onaddMeal={() => (pickerOpenForDay = day)}
      onremoveMeal={() => mealPlanStore.remove(day)}
    ></day-slot>
  {/each}
</div>

<RecipePicker open={pickerOpenForDay !== null} onPick={handlePick} onClose={() => (pickerOpenForDay = null)} />

<style>
  .subtitle { color: #666; margin-top: -0.5rem; margin-bottom: 1.5rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
</style>
