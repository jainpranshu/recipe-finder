export interface Ingredient {
  name: string;
  measure: string;
}

// Used for grid/list views — TheMealDB's list endpoints only return this much
export interface RecipeSummary {
  id: string;
  title: string;
  image: string;
  category?: string;
  source: 'api' | 'user';
}

// Used for the detail page — the full recipe
export interface Recipe extends RecipeSummary {
  area?: string;
  instructions: string;
  ingredients: Ingredient[];
  difficulty?: 'easy' | 'medium' | 'hard';
}
