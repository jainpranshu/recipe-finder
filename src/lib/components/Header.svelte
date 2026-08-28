<script lang="ts">
  let menuOpen = $state(false);
</script>

<header>
  <a href="/" class="logo">🍳 Recipe Finder</a>
  <button onclick={() => (menuOpen = !menuOpen)}>Menu</button>
  <nav class:open={menuOpen}>
    <a href="/">Discover</a>
    <a href="/my-recipes">My Recipes</a>
    <a href="/favorites">Favorites</a>
    <a href="/planner">Meal Planner</a>
  </nav>
</header>

<style>
  header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid #e5e5e5; }
  .logo { font-weight: 600; text-decoration: none; color: inherit; }
  nav { display: none; gap: 1.25rem; }
  nav.open { display: flex; flex-direction: column; }
  header button { display: block; }
  @media (min-width: 768px) {
    nav { display: flex; flex-direction: row; }
    header button { display: none; }
  }
</style>
