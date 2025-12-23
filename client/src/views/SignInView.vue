<script setup lang="ts">
import Card from "../components/Card.vue";
import AuthForm from "../components/AuthForm.vue";
</script>

<template>
  <h1>Sign in</h1>
  <Card>
    <p>
      Don't have an account yet?
      <RouterLink to="/signup">Sign up</RouterLink> here
    </p>

    <AuthForm path="/signin" />
  </Card>
</template>
