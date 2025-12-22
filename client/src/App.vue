<script setup lang="ts">
import type { RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/signup">Sign up</RouterLink>
      <RouterLink to="/signin">Sign in</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
#layout {
  max-width: 1200px;
  margin: 0px auto;
}

#header {
  margin-bottom: 2rem;
}

#headernav,
#headernav-right {
  flex-wrap: wrap;
}

#headernav {
  display: flex;
  align-items: center;
}

#headernav-left {
  flex: 1;
}

#headernav-right {
  display: flex;
  column-gap: 1rem;
}
</style>
