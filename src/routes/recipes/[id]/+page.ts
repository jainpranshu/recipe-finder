import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getRecipeById } from '$lib/api/mealdb';

export const load: PageLoad = async ({ params, fetch }) => {
  if (params.id.startsWith('user-')) {
    return { recipe: null, id: params.id };
  }

  let recipe;
  try {
    recipe = await getRecipeById(params.id, fetch);
  } catch (err) {
    console.error('Failed to fetch recipe', err);
    error(503, 'Could not reach the recipe service. Try again shortly.');
  }

  if (!recipe) error(404, 'Recipe not found');
  return { recipe, id: params.id };
};
