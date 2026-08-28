import type { Recipe, RecipeSummary, Ingredient } from '$lib/types';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

interface RawMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  [key: string]: string | undefined; // strIngredient1..20, strMeasure1..20
}

function toSummary(meal: RawMeal): RecipeSummary {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    source: 'api'
  };
}

function toRecipe(meal: RawMeal): Recipe {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: (meal[`strMeasure${i}`] ?? '').trim() });
    }
  }
  return { ...toSummary(meal), area: meal.strArea, instructions: meal.strInstructions ?? '', ingredients };
}

export async function searchRecipes(query: string, fetchFn: typeof fetch = fetch): Promise<RecipeSummary[]> {
  const res = await fetchFn(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  return (data.meals ?? []).map(toSummary);
}

export async function filterByCategory(category: string, fetchFn: typeof fetch = fetch): Promise<RecipeSummary[]> {
  const res = await fetchFn(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await res.json();
  return (data.meals ?? []).map(toSummary);
}

export async function getCategories(fetchFn: typeof fetch = fetch): Promise<string[]> {
  const res = await fetchFn(`${BASE}/categories.php`);
  const data = await res.json();
  return (data.categories ?? []).map((c: { strCategory: string }) => c.strCategory);
}

export async function getRandomRecipes(count = 12, fetchFn: typeof fetch = fetch): Promise<RecipeSummary[]> {
  // TheMealDB's /random.php has no "give me N unique" mode — it's one call per
  // recipe and duplicates are possible, so we dedupe by id and over-fetch a
  // little to make up the shortfall (capped at a couple of retries so a flaky
  // API can't turn this into an infinite loop).
  const byId = new Map<string, RecipeSummary>();
  let attempts = 0;
  const maxAttempts = count + 5;

  while (byId.size < count && attempts < maxAttempts) {
    const remaining = count - byId.size;
    const calls = Array.from({ length: remaining }, () =>
      fetchFn(`${BASE}/random.php`).then((r) => r.json())
    );
    attempts += remaining;
    const results = await Promise.all(calls);
    for (const d of results) {
      const meal = d.meals?.[0];
      if (meal) byId.set(meal.idMeal, toSummary(meal));
    }
  }

  return [...byId.values()];
}

export async function getRecipeById(id: string, fetchFn: typeof fetch = fetch): Promise<Recipe | null> {
  const res = await fetchFn(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals?.[0];
  return meal ? toRecipe(meal) : null;
}
