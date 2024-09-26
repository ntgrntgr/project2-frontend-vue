<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Course Logo" class="logo" src="@/assets/e3.gif" width="125" height="125" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/courses">Courses</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <div class="welcome-wrapper">
    <TheWelcome />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  z-index: 1000;
}

.logo {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

nav {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.welcome-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

@media (min-width: 1024px) {
  header {
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0;
  }

  nav {
    text-align: right;
    margin-left: 0;
    padding: 0;
    margin-top: 0;
  }
}
</style>
