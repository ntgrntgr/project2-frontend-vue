<script setup>
import HelloWorld from './HelloWorld.vue'
import Navbar from './Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div class="welcome-container">
    <HelloWorld msg="Welcome to CourseHub" />
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
