<script setup lang="ts">
import { useTemplateRef } from "vue";

defineProps<{ id: string; label: string; placeholder?: string }>();

const notch = useTemplateRef("notch");

const setFocused = (value: boolean) => {
  if (notch.value === null) return;

  if (value) {
    notch.value.classList.add("is-focused");
  } else {
    notch.value.classList.remove("is-focused");
  }
};
</script>

<template>
  <div class="field">
    <label :for="`field-id-${id}`" class="field-label">
      {{ label }}
    </label>
    <input
      :id="`field-id-${id}`"
      class="field-input"
      type="text"
      :placeholder="placeholder"
      @focusin="setFocused(true)"
      @focusout="setFocused(false)"
    />
    <fieldset ref="notch" class="field-notch" aria-hidden="true">
      <legend class="field-notch-spacer">
        {{ label }}
      </legend>
    </fieldset>
  </div>
</template>

<style>
.field {
  --border-width: 2px;
  --font-size: 0.75rem;
  --notch-offset: 0.5rem;
  --notch-spacer-padding: 0.25rem;
  --notch-width: calc(var(--notch-offset) + var(--notch-spacer-padding));

  position: relative;
}

.field-label,
.field-notch-spacer {
  font-size: var(--font-size);
  font-weight: 700;
}

.field-label {
  padding-left: calc(var(--border-width) + var(--notch-width));

  position: absolute;

  display: inline-block;
}

.field-notch {
  padding-block: 0px;
  padding-inline: var(--notch-offset);
  margin: 0px;

  position: absolute;
  inset: 0px;

  border: var(--border-width) solid var(--color-gray-12);
  border-radius: 0.5rem;

  pointer-events: none;

  display: block;
}

.field-notch.is-focused {
  border-color: var(--color-accent-blue);
}

.field-notch-spacer {
  padding-inline: var(--notch-spacer-padding);

  visibility: hidden;
}

.field-input {
  width: 100%;
  padding: 1rem;
  border: none;
  margin-top: calc(var(--font-size) / 2);

  background-color: transparent;

  font: inherit;

  box-sizing: border-box;
}

.field-input:focus-visible {
  outline: none;
}
</style>
