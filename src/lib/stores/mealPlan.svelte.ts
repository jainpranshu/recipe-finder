import type { RecipeSummary } from '$lib/types';
import { DAYS, type Day } from '$lib/days';

const STORAGE_KEY = 'recipe-finder:meal-plan';
type PlanMap = Partial<Record<Day, RecipeSummary>>;

function loadInitial(): PlanMap {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persist(plan: PlanMap) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }
}

let plan = $state<PlanMap>(loadInitial());

export const mealPlanStore = {
  get days() {
    return DAYS;
  },
  recipeFor(day: Day) {
    return plan[day];
  },
  assign(day: Day, recipe: RecipeSummary) {
    plan[day] = recipe;
    persist(plan);
  },
  remove(day: Day) {
    plan[day] = undefined;
    persist(plan);
  }
};
