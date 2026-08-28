import type { Recipe } from '$lib/types';

const STORAGE_KEY = 'recipe-finder:user-recipes';

function loadInitial(): Recipe[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(list: Recipe[]) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

let recipes = $state<Recipe[]>(loadInitial());

export const userRecipesStore = {
  get all() {
    return recipes;
  },
  get(id: string): Recipe | undefined {
    return recipes.find((r) => r.id === id);
  },
  create(input: Omit<Recipe, 'id' | 'source'>): Recipe {
    const recipe: Recipe = { ...input, id: `user-${crypto.randomUUID()}`, source: 'user' };
    recipes.push(recipe);
    persist(recipes);
    return recipe;
  },
  update(id: string, input: Omit<Recipe, 'id' | 'source'>) {
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return;
    recipes[index] = { ...input, id, source: 'user' };
    persist(recipes);
  },
  remove(id: string) {
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return;
    recipes.splice(index, 1);
    persist(recipes);
  }
};
