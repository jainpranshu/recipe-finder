# Recipe Finder & Meal Planner

A recipe discovery and weekly meal-planning app built with **SvelteKit 5** (runes) and **TypeScript**, using **[TheMealDB](https://www.themealdb.com/api.php)** as the public recipe API. All presentational UI is implemented as framework-agnostic **web components**, published as a standalone npm package — [`@jainpranshu/recipe-ui-kit`](#) — and consumed by this app, not imported from source.

- **Live app:** REPLACE_WITH_DEPLOYED_URL
- **This repo (SvelteKit app):** https://github.com/jainpranshu/recipe-finder
- **Component library repo:** https://github.com/jainpranshu/recipe-ui-kit
- **Component library on npm:** https://www.npmjs.com/package/@jainpranshu/recipe-ui-kit

---

## What's here

| Feature | Where |
|---|---|
| Search / browse / filter recipes | `/` — `src/routes/+page.svelte` + `+page.ts` |
| Recipe detail page | `/recipes/[id]` |
| Add / edit / delete your own recipes, with validation | `/recipes/new`, `/recipes/[id]/edit`, `src/lib/validation/recipe.ts` |
| Favorites (add / remove / view) | `/favorites`, `src/lib/stores/favorites.svelte.ts` |
| Weekly meal planner (assign / modify / remove per day) | `/planner`, `src/lib/stores/mealPlan.svelte.ts` |

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for a file-by-file walkthrough of how these pieces fit together — routing, state, and the boundary between this app and the component library.

## Tech stack

- **SvelteKit 5** + TypeScript, Vite build
- **StencilJS** for the component library (compiles to standard Custom Elements — no framework lock-in)
- **TheMealDB** free public API for recipe data (search, filter, random, lookup)
- **No backend / database** — favorites, the meal plan, and user-created recipes are all persisted to `localStorage` (see [Assumptions](#assumptions))

## Setup instructions

Requires Node 18+.

```bash
git clone https://github.com/jainpranshu/recipe-finder
cd recipe-finder
npm install
```

The component library is a normal published dependency (see `package.json`) — `npm install` pulls it from npm like any other package, no extra setup needed.

### Starting the development server

```bash
npm run dev
# or, to open it in a browser automatically:
npm run dev -- --open
```

The app runs at `http://localhost:5173`.

### Other scripts

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run check     # type-check the whole project (svelte-check)
```

## Assumptions

Since the assignment leaves several design decisions open, here's what I chose and why:

- **No backend / auth.** The brief doesn't call for user accounts, so favorites, the meal plan, and user-created recipes are stored in the browser's `localStorage`, keyed per-device. This keeps the app deployable as a static/SSR site with no database to provision, at the cost of data not syncing across devices — a reasonable trade-off for the scope here.
- **Two id namespaces for recipes.** API recipes use TheMealDB's numeric `idMeal`; user-created recipes are stamped with a `user-` prefixed UUID (`src/lib/stores/userRecipes.svelte.ts`). This is how the app knows, on a shared `/recipes/[id]` route, whether to fetch from the API or read from local storage — and it's how it enforces that only recipes *you* created can be edited or deleted.
- **Recipe "source" is preserved through favorites/planner.** A favorited API recipe and a favorited user recipe are stored the same way (`RecipeSummary`), so the meal planner and favorites list work uniformly regardless of where a recipe came from.
- **Client-side validation only** for the recipe form (`src/lib/validation/recipe.ts`) — there's no server to also validate against, since there's no backend.
- **TheMealDB has no auth/rate-limit tier in play here** — it's used as-is, unauthenticated, as documented for their free tier.

## Consuming the component library

This app depends on the **published** npm package, not the source folder:

```json
"dependencies": {
  "@jainpranshu/recipe-ui-kit": "^1.0.0"
}
```

Components are imported per-component (tree-shakeable) and used as native custom elements, e.g. in `src/lib/components/RecipeCard.svelte`:

```svelte
<script lang="ts">
  import '@jainpranshu/recipe-ui-kit/recipe-card';
</script>

<recipe-card
  recipe-id={recipe.id}
  recipe-title={recipe.title}
  favorited={favorited}
  oncardSelect={() => goto(`/recipes/${recipe.id}`)}
  onfavoriteToggle={() => favoritesStore.toggle(recipe)}
></recipe-card>
```

Properties flow one way in (Svelte → Stencil via attributes/props); the component fires custom events back out, which Svelte handles with `on<eventName>`. See **ARCHITECTURE.md** for the full list of components and the props/events each one exposes.

## Known limitations / future work

- No automated test coverage in this app package yet (the component library has its own test suite — see its README).
- No CI pipeline configured.
- Data doesn't sync across devices (see Assumptions above) — a real backend would be the natural next step.
