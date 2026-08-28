import type { PageLoad } from './$types';
import { searchRecipes, filterByCategory, getCategories, getRandomRecipes } from '$lib/api/mealdb';

export const load: PageLoad = async ({ url, fetch }) => {
  const query = url.searchParams.get('q') ?? '';
  const category = url.searchParams.get('category') ?? '';

  try {
    const [recipes, categories] = await Promise.all([
      query ? searchRecipes(query, fetch) : category ? filterByCategory(category, fetch) : getRandomRecipes(12, fetch),
      getCategories(fetch)
    ]);
    return { recipes, categories, query, category, error: null };
  } catch (err) {
    console.error('Failed to load recipes', err);
    return { recipes: [], categories: [], query, category, error: 'Could not reach the recipe API. Try again shortly.' };
  }
};
