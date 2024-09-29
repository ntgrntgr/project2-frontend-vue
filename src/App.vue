<script setup>
import { ref, watch } from 'vue';
import Navbar from './components/Navbar.vue';

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

watch(isAuthenticated, (newValue) => {
  localStorage.setItem('isAuthenticated', newValue);
});
</script>

<template>
  <div class="welcome-wrapper">
    <Navbar v-if="isAuthenticated" />
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
