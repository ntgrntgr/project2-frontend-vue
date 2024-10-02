<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from './Navbar.vue';
import axios from 'axios'; // Import axios for API calls
import { saveAs } from 'file-saver';

const courses = ref([]);
const departments = ['All', 'Computer Science', 'Mathematics']; // Add more departments as needed
const semesters = ['All', 'Fall 2023', 'Spring 2024']; // Add more semesters as needed

const selectedDepartment = ref('All');
const selectedSemester = ref('All');
const exportFormat = ref('CSV');

const filteredCourses = computed(() => {
  return courses.value.filter(course => 
    (selectedDepartment.value === 'All' || course.department === selectedDepartment.value) &&
    (selectedSemester.value === 'All' || course.semester === selectedSemester.value)
  );
});

// Fetch courses from the backend API
const fetchCourses = async () => {
  try {
    const response = await axios.get('http://localhost:3100/api/course'); 
    courses.value = response.data; // Assume your API returns an array of courses
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

onMounted(() => {
  fetchCourses(); // Fetch courses when the component is mounted
});

const exportCourses = () => {
  const data = filteredCourses.value.map(course => ({
    Title: course.title,
    Description: course.description,
    Enrollment: course.enrollment,
    Department: course.department,
    Semester: course.semester,
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
  </div>
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
          Semester:
          <select v-model="selectedSemester">
            <option v-for="sem in semesters" :key="sem" :value="sem">{{ sem }}</option>
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
        <div v-for="course in filteredCourses" :key="course.id" class="course-card">
          <h2>{{ course.title }}</h2>
          <p>{{ course.description }}</p>
          <p>Enrollment: {{ course.enrollment }}</p>
          <p>Department: {{ course.department }}</p>
          <p>Semester: {{ course.semester }}</p>
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
}
</style>
