<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="error-page">
  <h1>{page.status}</h1>
  <p>{page.error?.message ?? 'Something went wrong.'}</p>
  <a href="/">&larr; Back to discovery</a>
</div>

<style>
  .error-page { text-align: center; padding: 4rem 1rem; }
  h1 { font-size: 3rem; margin: 0; color: #b3261e; }
  a { display: inline-block; margin-top: 1rem; }
</style>
