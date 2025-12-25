<script setup lang="ts">
import useAuth, { type AuthRoutePath } from "../composables/useAuth";
import TextField from "../components/TextField.vue";

const props = defineProps<{ path: AuthRoutePath }>();

const { fields, submitLabel, handleSubmit } = useAuth(props.path);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <TextField v-model="fields.email" id="email" label="E-Mail" />
    <TextField v-model="fields.password" id="password" label="Password" />
    <button type="submit">{{ submitLabel }}</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 1rem;
}
</style>
