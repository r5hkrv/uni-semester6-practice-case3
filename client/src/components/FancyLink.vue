<script setup lang="ts">
const props = defineProps({
  to: { type: String, required: true },
});
</script>

<template>
  <RouterLink class="link" :to="props.to">
    <span class="link-text">
      <slot></slot>
    </span>
  </RouterLink>
</template>

<style>
.link {
  padding: 0.75rem;

  color: oklch(0.72 0.24 235);

  text-decoration: none;

  display: inline-block;
}

.router-link-exact-active.link {
  color: oklch(0.72 0.24 0);
}

.link-text {
  padding-top: 2px;

  border-bottom: 2px dotted;

  font-weight: 700;
}

.router-link-exact-active.link > .link-text {
  border-color: transparent;
}
</style>
