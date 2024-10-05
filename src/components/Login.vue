<script setup>
import { useRouter } from 'vue-router';
import gAuthPlugin from 'vue3-google-oauth2';

const router = useRouter();

const loginWithGoogle = () => {
  // Load the Google Auth library
  const { gapi } = window;

  gapi.load('client:auth2', () => {
    gapi.auth2.init({
      client_id: '175513569008-vju8cuj2d19mrnpq9rf3ck9n0ge1h83d.apps.googleusercontent.com' // Set this in your .env file
    }).then(() => {
      const authInstance = gapi.auth2.getAuthInstance();
      authInstance.signIn().then((googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;

        // Send the id_token to your backend for verification
        fetch('http://your-backend-url/tutorial/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ credential: id_token })
})

        .then(response => response.json())
        .then(data => {
          if (data.token) {
            // Store the token and update the authentication state
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('token', data.token);
            router.push({ name: 'home' });
          } else {
            console.error('Login failed:', data);
          }
        })
        .catch(err => console.error('Error:', err));
      });
    });
  });
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