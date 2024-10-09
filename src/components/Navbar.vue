<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const showNotifications = ref(false);
const isAuthenticated = ref(false);
const notifications = ref([]);
const unreadCount = ref(0);
const router = useRouter();
const bellClass = ref('');
let notificationInterval;

const toggleNotifications = async () => {
  showNotifications.value = !showNotifications.value;

  if (showNotifications.value) {
    // Reset unread count when viewing notifications
    unreadCount.value = 0;

    // Mark all notifications as read and send update to server
    const unreadNotifications = notifications.value.filter(notification => !notification.read);
    if (unreadNotifications.length > 0) {
      try {
        await axios.patch('http://localhost:3100/api/notifications/read', {
          ids: unreadNotifications.map(notification => notification.id),
        });
      } catch (error) {
        console.error('Error marking notifications as read:', error);
        alert('Could not mark notifications as read. Please try again later.');
      }
      
      notifications.value.forEach(notification => {
        notification.read = true; // Mark as read locally
      });
    }

    bellClass.value = ''; // Stop shaking when opened
  }
};

const logout = () => {
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = false;
  router.push({ name: 'login' });
};

const fetchNotifications = async () => {
  try {
    const response = await axios.get('http://localhost:3100/api/notifications');
    const newNotifications = response.data;

    // Count new unread notifications
    const newUnreadCount = newNotifications.filter(notification => !notification.read).length;

    // Set notifications and unread count
    notifications.value = newNotifications;

    // Reset the unread count
    unreadCount.value = newUnreadCount;

    if (newUnreadCount > 0) {
      bellClass.value = 'shake'; // Add shaking class for unread notifications
    } else {
      bellClass.value = ''; // Stop shaking if no unread notifications
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    alert('Could not fetch notifications. Please try again later.');
  }
};

// Start polling for notifications at a reduced frequency
const startPolling = () => {
  notificationInterval = setInterval(fetchNotifications, 15000); // Poll every 15 seconds
};

onMounted(async () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated.value) {
    await fetchNotifications();
    startPolling(); // Start polling for notifications
  }
});

// Clear interval on component unmount
onBeforeUnmount(() => {
  clearInterval(notificationInterval);
});
</script>

<template>
  <header v-if="isAuthenticated">
    <img alt="Course Logo" class="logo" src="@/assets/e3.gif" width="150" height="150" />
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/courses">Courses</router-link>
      <button @click="toggleNotifications" class="notifications-button">
        <i class="fas fa-bell" :class="bellClass"></i>
        <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
      </button>
      <button @click="logout" class="logout-button">Logout</button>
    </nav>
  </header>

  <div v-if="showNotifications" class="notifications-popup">
    <h2>Notifications</h2>
    <ul>
      <li v-for="notification in notifications.slice(0, 5)" :key="notification.id">
        {{ notification.message }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
  z-index: 1000; /* High enough to stay on top */
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  z-index: 1000; /* High enough to stay on top */
}

nav a:first-of-type {
  border: 0;
  z-index: 1000; /* High enough to stay on top */
}

.notifications-button {
  background: none;
  position: relative;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--color-text);
}

.unread-badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.1rem 0.1rem;
  font-size: 0.8rem;
}

.shake {
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0% { transform: translate(0); }
  25% { transform: translate(-2px, 0); }
  50% { transform: translate(2px, 0); }
  75% { transform: translate(-2px, 0); }
  100% { transform: translate(0); }
}

.notifications-popup {
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #7e8c9b;
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

.logout-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--color-text);
  padding: 0 1rem;
}

@media (min-width: 1024px) {
  header {
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0;
  }
}
</style>
