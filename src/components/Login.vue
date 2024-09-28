<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const loginWithGoogle = () => {
  // This function will be implemented to trigger Google OAuth
  console.log('Initiating Google login');
  // For now, we'll simulate a successful login
  localStorage.setItem('isAuthenticated', 'true');
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="login-container">
    <div class="greetings">
      <h1 class="green">Welcome to CourseHub</h1>
      <h3>
        Find the perfect course to enhance your skills
      </h3>
      <div class="login-form">
        <button @click="loginWithGoogle" class="google-login-button">
          Login with Google
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.google-login-button {
  padding: 10px 20px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.google-login-button:hover {
  background-color: #357AE8;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>