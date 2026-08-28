<script lang="ts">
  import '@jainpranshu/recipe-ui-kit/ui-dialog';

  let {
    open,
    title,
    message,
    onConfirm,
    onCancel
  }: { open: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void } = $props();
</script>

<ui-dialog {open} dialog-title={title} ondialogClose={onCancel}>
  <p>{message}</p>
  <div class="actions">
    <button class="cancel" onclick={onCancel}>Cancel</button>
    <button class="confirm" onclick={onConfirm}>Delete</button>
  </div>
</ui-dialog>

<style>
  .actions { display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 1rem; }
  button { padding: 0.45rem 1rem; border-radius: 6px; border: 1px solid #d0d0d0; background: white; cursor: pointer; font-size: 0.9rem; }
  .confirm { background: #b3261e; color: white; border-color: #b3261e; }
</style>
