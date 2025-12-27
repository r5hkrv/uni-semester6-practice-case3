<script setup lang="ts">
import { shallowRef, computed } from "vue";
import { useRouter } from "vue-router";

import useAuthStore, { type AuthPath } from "../composables/useAuthStore";
import TextField from "../components/TextField.vue";

const props = defineProps<{ path: AuthPath }>();

const submitLabel = computed(() => {
  switch (props.path) {
    case "/signin":
      return "Continue";
    case "/signup":
      return "Create a new account";
  }
});

const { fetchToken, fetchProfile } = useAuthStore();
const router = useRouter();

const fields = shallowRef({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  let ok = await fetchToken(props.path, fields.value);

  if (!ok) return;

  ok = await fetchProfile();

  if (ok) router.push("/");
};
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
