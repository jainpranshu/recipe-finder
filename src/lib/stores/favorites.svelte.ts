import type { RecipeSummary } from '$lib/types';

const STORAGE_KEY = 'recipe-finder:favorites';

function loadInitial(): RecipeSummary[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(list: RecipeSummary[]) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

let favorites = $state<RecipeSummary[]>(loadInitial());

export const favoritesStore = {
  get all() {
    return favorites;
  },
  has(id: string) {
    return favorites.some((r) => r.id === id);
  },
  toggle(recipe: RecipeSummary) {
    const summary: RecipeSummary = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      category: recipe.category,
      source: recipe.source
    };
    const index = favorites.findIndex((r) => r.id === summary.id);
    if (index === -1) favorites.push(summary);
    else favorites.splice(index, 1);
    persist(favorites);
  }
};
