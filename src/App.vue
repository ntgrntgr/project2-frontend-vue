<script setup>
import { ref } from 'vue';

const showNotifications = ref(false);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};
</script>

<template>
  <header>
    <img alt="Course Logo" class="logo" src="@/assets/e3.gif" width="150" height="150" />
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/courses">Courses</router-link>
      <router-link to="/add-course">Add Course</router-link>
      <button @click="toggleNotifications" class="notifications-button">
        <i class="fas fa-bell"></i>
      </button>
    </nav>
  </header>

  <div class="welcome-wrapper">
    <router-view></router-view>
  </div>

  <div v-if="showNotifications" class="notifications-popup">
    <h2>Notifications</h2>
    <ul>
      <li>New course added: Advanced Web Development</li>
      <li>Reminder: Assignment due in 2 days</li>
      <li>Course update: Changes to syllabus for Introduction to AI</li>
    </ul>
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

.notifications-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--color-text);
}

.notifications-popup {
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #2c3e50;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.notifications-popup h2 {
  margin-top: 0;
}

.notifications-popup ul {
  list-style-type: none;
  padding: 0;
}

.notifications-popup li {
  margin-bottom: 0.5rem;
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
