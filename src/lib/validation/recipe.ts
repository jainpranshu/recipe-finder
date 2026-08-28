export interface RecipeFormValues {
  title: string;
  image: string;
  category: string;
  area: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: { name: string; measure: string }[];
  instructions: string;
}

export interface ValidationErrors {
  title?: string;
  image?: string;
  ingredients?: string;
  instructions?: string;
}

export function validateRecipe(values: RecipeFormValues): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.title.trim() || values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }

  if (!values.image.trim()) {
    errors.image = 'An image URL is required.';
  } else {
    try {
      new URL(values.image);
    } catch {
      errors.image = 'Enter a valid URL.';
    }
  }

  if (values.ingredients.filter((i) => i.name.trim()).length === 0) {
    errors.ingredients = 'Add at least one ingredient.';
  }

  if (!values.instructions.trim() || values.instructions.trim().length < 10) {
    errors.instructions = 'Instructions must be at least 10 characters.';
  }

  return errors;
}
