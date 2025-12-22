<script setup lang="ts">
import type { RouterView } from "vue-router";
</script>

<template>
  <div id="layout">
    <header id="header" class="card">
      <nav id="headernav">
        <div id="headernav-left">
          <RouterLink class="link" to="/">
            <span class="link-text">Home</span>
          </RouterLink>
        </div>
        <div id="headernav-right">
          <RouterLink class="link" to="/signup">
            <span class="link-text">Sign up</span>
          </RouterLink>
          <RouterLink class="link" to="/signin">
            <span class="link-text">Sign in</span>
          </RouterLink>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
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
