<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

defineProps({
  msg: {
    type: String,
    required: true
  }
})

const courses = ref([]); // Reactive variable to store courses
const searchQuery = ref(''); // Reactive variable for search query
const isLoading = ref(true); // Loading state

// Fetch courses from the backend API
const fetchCourses = async () => {
  try {
    const response = await axios.get('http://localhost:3100/api/lessons'); 
    courses.value = response.data.map(course => ({
      ...course,
      description: course.description || "None"
    }));
  } catch (error) {
    console.error('Error fetching courses:', error.response || error.message);
  } finally {
    isLoading.value = false; // Set loading to false
  }
};

onMounted(() => {
  fetchCourses(); // Fetch courses when the component is mounted
});

// Computed property to filter courses based on the search query
const filteredCourses = computed(() => {
  // Return an empty array if the search query is empty
  if (!searchQuery.value) {
    return [];
  }
  
  // Filter courses based on the search query
  return courses.value.filter(course => 
    course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
    course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Find the perfect course to enhance your skills
    </h3>
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search for courses..." 
      />
      <button>Search</button>
    </div>

    <!-- Container for displaying filtered courses -->
    <div v-if="!isLoading && filteredCourses.length > 0" class="search-results">
      <h4>Search Results:</h4>
      <div class="course-list">
        <div 
          v-for="course in filteredCourses.slice(0, 5)" 
          :key="course.id" 
          class="course-card"
        >
          <h2>{{ course.name }}</h2>
          <p><strong>Department:</strong> {{ course.dept }}</p>
          <p><strong>Level:</strong> {{ course.level }}</p>
          <p><strong>Hours:</strong> {{ course.hours }}</p>
          <p class="description">{{ course.description }}</p>
        </div>
      </div>
      <div v-if="filteredCourses.length > 5" class="scroll-container">
        <p>Scroll down for more results...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.greetings {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  margin: 20px; /* Optional: Add some margin */
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.search-bar input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  margin-left: 2px;
}

.search-results {
  margin-top: 10px; /* Space between the search bar and the results */
  width: 100%; /* Ensure it takes full width */
  display: flex;
  flex-direction: column; /* Stack results vertically */
  align-items: center; /* Center results horizontally */
}

.course-list {
  display: flex;
  flex-wrap: wrap; /* Allow cards to wrap into a new row */
  justify-content: center; /* Center the course cards */
  max-height: 300px; /* Limit height of the course cards container */
  overflow-y: auto; /* Allow vertical scrolling */
}

.course-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin: 5px; /* Add spacing between course cards */
  width: 250px; /* Set a fixed width for course cards */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add some shadow for better visibility */
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scroll-container {
  text-align: center;
  margin-top: 10px; /* Space above scroll notice */
}

@media (min-width: 1024px) {
  .greetings {
    align-items: flex-start; /* Align items to the start on larger screens */
  }
}
</style>
