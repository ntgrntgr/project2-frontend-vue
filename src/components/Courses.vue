<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from './Navbar.vue';
import axios from 'axios'; // Import axios for API calls
import { saveAs } from 'file-saver';

const courses = ref([]);
const departments = ref([]); // Ref for departments
const selectedDepartment = ref('All');
const exportFormat = ref('CSV');

const filteredCourses = computed(() => {
  return courses.value.filter(course => 
    (selectedDepartment.value === 'All' || course.dept === selectedDepartment.value)
  );
});

// Fetch courses from the backend API
const fetchCourses = async () => {
  try {
    const response = await axios.get('http://localhost:3100/api/lessons'); 
    courses.value = response.data.map(course => ({
      ...course,
      description: course.description || "None" // Default description if none exists
    }));
    // Extract unique departments
    const uniqueDepartments = [...new Set(courses.value.map(course => course.dept))];
    departments.value = ['All', ...uniqueDepartments]; // Add 'All' option
  } catch (error) {
    console.error('Error fetching courses:', error.response || error.message);
  }
};

onMounted(() => {
  fetchCourses(); // Fetch courses when the component is mounted
});

const exportCourses = () => {
  const data = filteredCourses.value.map(course => ({
    Title: course.title,
    Description: course.description,
    Department: course.dept,
  }));

  if (exportFormat.value === 'CSV') {
    const csvContent = "data:text/csv;charset=utf-8," + 
      data.map(e => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(new Blob([csvContent]), 'courses.csv');
  } else if (exportFormat.value === 'PDF') {
    alert('PDF export functionality is not implemented yet.');
  }
};
</script>


<template>
  <div>
    <Navbar />
    <div class="courses-container">
      <div class="centered-content">
        <h1 style="color: hsla(160, 100%, 37%, 1)">Courses</h1>
        
        <div class="filters">
          <label>
            Department:
            <select v-model="selectedDepartment">
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
          </label>
          <label>
            Export Format:
            <select v-model="exportFormat">
              <option value="CSV">CSV</option>
              <option value="PDF">PDF</option>
            </select>
          </label>
          <button @click="exportCourses">Export Courses</button>
        </div>

        <div class="course-list">
          <div v-for="course in filteredCourses" :key="course.id" class="course-card" @click="course.showDescription = !course.showDescription">
            <h2>{{ course.course_number }}: {{ course.name }}</h2>
            <p><strong>Department:</strong> {{ course.dept }}</p>
            <p><strong>Level:</strong> {{ course.level }}</p>
            <p><strong>Hours:</strong> {{ course.hours }}</p>
            <p class="description" :title="course.description">
              {{ course.showDescription ? course.description : course.description.length > 30 ? course.description.slice(0, 30) + '...' : course.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.courses-container {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: auto;
}

.centered-content {
  text-align: center;
  width: 100%;
}

.filters {
  margin-bottom: 1rem;
}

.filters label {
  margin-right: 1rem;
}

.filters button {
  margin-left: 1rem;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: center;
  max-height: 80vh;
  overflow-y: auto;
}

.course-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer; /* Indicate clickable card */
  transition: background-color 0.3s;
}



.description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Ensure single line */
}
</style>
