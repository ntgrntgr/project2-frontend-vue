<script setup>
import HelloWorld from './HelloWorld.vue'
</script>

<template>
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
