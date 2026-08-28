<script lang="ts">
  import { goto } from '$app/navigation';
  import type { RecipeSummary } from '$lib/types';
  import { favoritesStore } from '$lib/stores/favorites.svelte';
  import '@jainpranshu/recipe-ui-kit/recipe-card';
  import '@jainpranshu/recipe-ui-kit/ui-badge';

  let { recipe }: { recipe: RecipeSummary } = $props();
  let favorited = $derived(favoritesStore.has(recipe.id));
</script>

<recipe-card
  recipe-id={recipe.id}
  recipe-title={recipe.title}
  image={recipe.image}
  category={recipe.category}
  favorited={favorited}
  oncardSelect={() => goto(`/recipes/${recipe.id}`)}
  onfavoriteToggle={() => favoritesStore.toggle(recipe)}
></recipe-card>
