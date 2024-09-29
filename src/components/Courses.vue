<script setup>
import { ref, computed } from 'vue';
import Navbar from './Navbar.vue';
import { saveAs } from 'file-saver'; // Add this import for file saving

// Dummy data for courses (replace with actual API call later)
const courses = ref([
  { id: 1, title: 'Introduction to Computer Science', description: 'Learn the basics of programming', enrollment: 150, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 2, title: 'Advanced Mathematics', description: 'Explore complex mathematical concepts', enrollment: 80, department: 'Mathematics', semester: 'Spring 2024' },
  // Add more dummy courses as needed
]);

const departments = ['All', 'Computer Science', 'Mathematics']; // Add more departments as needed
const semesters = ['All', 'Fall 2023', 'Spring 2024']; // Add more semesters as needed

const selectedDepartment = ref('All');
const selectedSemester = ref('All');
const exportFormat = ref('CSV'); // New state for export format

const filteredCourses = computed(() => {
  return courses.value.filter(course => 
    (selectedDepartment.value === 'All' || course.department === selectedDepartment.value) &&
    (selectedSemester.value === 'All' || course.semester === selectedSemester.value)
  );
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
    // PDF generation logic (using a library like jsPDF)
    // Placeholder for PDF export
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
        <button @click="exportCourses">Export Courses</button> <!-- New export button -->
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
  margin-left: 1rem; /* Add margin for the button */
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: center;
}

.course-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
}
</style>
