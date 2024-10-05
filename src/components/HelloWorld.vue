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
  </div>
    <!-- Container for displaying filtered courses -->
     <div class="search-results">
    <div v-if="!isLoading && filteredCourses.length > 0" class="search-results">
    </div>
      <h4>Search Results:</h4>
      <div class="course-list">
        <div 
        
          v-for="course in filteredCourses.slice(0, 9)" 
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
</template>

<style scoped>
.greetings {
  position: relative;
  left: 200px;
}


h1 {
  position: relative;
  left: 300px;
  font-weight: 500;
  font-size: 2.6rem;
  white-space: nowrap; /* Prevents text from wrapping */
}

h3 {
  position: relative;
  left: 300px;
  font-size: 1.2rem;
}

.search-bar {
  position: relative;
  left: 300px;
  margin-top: 20px; /* This can be adjusted if you want more space */
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
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  position: relative;
  left: 5px;
}

.search-results {
  position: relative;
  right: 200px;
  margin-top: 360px; /* Space below the search bar */
  width: 100%; /* Ensure it takes full width */
  display: flex;  
  flex-direction: column; /* Stack results vertically */
  align-items: center; /* Center results horizontally */
}

.course-list {
  display: flex;
  flex-wrap: wrap; /* Allow cards to wrap into a new row */
  justify-content: center; /* Center the course cards */
  max-height: 400px; /* Set a maximum height for the course list */
  overflow-y: auto; /* Allow vertical scrolling */
  margin-top: 20px; /* Space between search results and course list */
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
