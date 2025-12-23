<script setup lang="ts">
import FancyLink from "./components/FancyLink.vue";
</script>

<template>
  <header id="header" class="header">
    <nav id="header-nav">
      <div id="header-nav-main">
        <FancyLink to="/">Home</FancyLink>
      </div>
      <FancyLink to="/signin">Sign in</FancyLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
#header {
  margin-bottom: 2rem;
}

#header-nav,
#header-nav-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 0.5rem;
}

#header-nav-main {
  flex: 1;
}

.header {
  padding: 1rem;

  border-radius: 1rem;

  background-color: oklch(1 0 0);
}
</style>
