
<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const isGapiLoaded = ref(false);

    const loadGapi = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error('Failed to load Google API script'));
        };
        document.head.appendChild(script);
      });
    };

    const initializeGapi = () => {
      return new Promise((resolve, reject) => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '175513569008-vju8cuj2d19mrnpq9rf3ck9n0ge1h83d.apps.googleusercontent.com',
          },(error) => {
            console.error('Error loading auth2:', error)}
          ).then(() => {
            isGapiLoaded.value = true;
            resolve();
          }).catch(error => {
            console.error('Error initializing Google Auth', error);
            reject(error);
          });
        });
      });
    };

    const loginWithGoogle = async () => {
      if (!isGapiLoaded.value) {
        console.error('Google API not loaded yet');
        return;
      }

      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then((googleUser) => {
        // Handle successful login here
        console.log('User signed in:', googleUser);
      }).catch(error => {
        console.error('Login failed:', error);
      });
    };

    onMounted(async () => {
      try {
        await loadGapi();
        await initializeGapi();
      } catch (error) {
        console.error('Error loading Google API:', error);
      }
    });

    return {
      loginWithGoogle,
    };
  },
};
</script>


<template>
  <div class="login-container">
    <div class="greetings">
      <h1 class="green">Welcome to CourseHub</h1>
      <h3>Find the perfect course to enhance your skills</h3>
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