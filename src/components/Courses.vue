<script setup>
import { ref, computed } from 'vue';

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

const filteredCourses = computed(() => {
  return courses.value.filter(course => 
    (selectedDepartment.value === 'All' || course.department === selectedDepartment.value) &&
    (selectedSemester.value === 'All' || course.semester === selectedSemester.value)
  );
});
</script>

<template>
  <div class="courses-container">
    <div class="centered-content">
      <h1>Courses</h1>
      
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
