<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="welcome-wrapper">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<style scoped>



.welcome-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

</style>
