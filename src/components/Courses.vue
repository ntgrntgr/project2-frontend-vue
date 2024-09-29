<script setup>
import { ref, computed } from 'vue';
import Navbar from './Navbar.vue';
import { saveAs } from 'file-saver'; // Add this import for file saving

// Dummy data for courses (replace with actual API call later)
const courses = ref([
  { id: 1, title: 'Introduction to Computer Science', description: 'Learn the basics of programming', enrollment: 150, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 2, title: 'Advanced Mathematics', description: 'Explore complex mathematical concepts', enrollment: 80, department: 'Mathematics', semester: 'Spring 2024' },
  { id: 3, title: 'Introduction to Physics', description: 'Learn the basics of physics', enrollment: 120, department: 'Physics', semester: 'Fall 2023' },
  { id: 4, title: 'Data Structures and Algorithms', description: 'Learn about data structures and algorithms', enrollment: 100, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 5, title: 'Artificial Intelligence', description: 'Explore the world of AI', enrollment: 90, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 6, title: 'Machine Learning', description: 'Learn about machine learning', enrollment: 70, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 7, title: 'Deep Learning', description: 'Explore the depths of deep learning', enrollment: 60, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 8, title: 'Neural Networks', description: 'Learn about neural networks', enrollment: 50, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 9, title: 'Computer Vision', description: 'Explore the world of computer vision', enrollment: 40, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 10, title: 'Natural Language Processing', description: 'Learn about NLP', enrollment: 30, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 11, title: 'Reinforcement Learning', description: 'Explore the world of reinforcement learning', enrollment: 20, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 12, title: 'Robotics', description: 'Learn about robotics', enrollment: 10, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 13, title: 'Databases', description: 'Learn about databases', enrollment: 150, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 14, title: 'Web Development', description: 'Learn about web development', enrollment: 140, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 15, title: 'Mobile Development', description: 'Learn about mobile development', enrollment: 130, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 16, title: 'Cloud Computing', description: 'Learn about cloud computing', enrollment: 120, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 17, title: 'Cybersecurity', description: 'Learn about cybersecurity', enrollment: 110, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 18, title: 'Networks', description: 'Learn about networks', enrollment: 100, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 19, title: 'Operating Systems', description: 'Learn about operating systems', enrollment: 90, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 20, title: 'Software Engineering', description: 'Learn about software engineering', enrollment: 80, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 21, title: 'Game Development', description: 'Learn about game development', enrollment: 70, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 22, title: 'Data Science', description: 'Learn about data science', enrollment: 60, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 23, title: 'Big Data', description: 'Learn about big data', enrollment: 50, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 24, title: 'IoT', description: 'Learn about IoT', enrollment: 40, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 25, title: 'Blockchain', description: 'Learn about blockchain', enrollment: 30, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 26, title: 'Quantum Computing', description: 'Learn about quantum computing', enrollment: 20, department: 'Computer Science', semester: 'Spring 2024' },
  { id: 27, title: 'Bioinformatics', description: 'Learn about bioinformatics', enrollment: 10, department: 'Computer Science', semester: 'Fall 2023' },
  { id: 28, title: 'Introduction to Psychology', description: 'Learn about psychology', enrollment: 150, department: 'Psychology', semester: 'Spring 2024' },
  { id: 29, title: 'Sociology', description: 'Learn about sociology', enrollment: 140, department: 'Sociology', semester: 'Fall 2023' },
  { id: 30, title: 'Economics', description: 'Learn about economics', enrollment: 130, department: 'Economics', semester: 'Spring 2024' },
  { id: 31, title: 'Business Management', description: 'Learn about business management', enrollment: 120, department: 'Business', semester: 'Fall 2023' },
  { id: 32, title: 'Marketing', description: 'Learn about marketing', enrollment: 110, department: 'Business', semester: 'Spring 2024' },
  { id: 33, title: 'Finance', description: 'Learn about finance', enrollment: 100, department: 'Business', semester: 'Fall 2023' },
  { id: 34, title: 'Accounting', description: 'Learn about accounting', enrollment: 90, department: 'Business', semester: 'Spring 2024' },
  { id: 35, title: 'Human Resources', description: 'Learn about human resources', enrollment: 80, department: 'Business', semester: 'Fall 2023' },
  { id: 36, title: 'Environmental Science', description: 'Learn about environmental science', enrollment: 70, department: 'Environmental Science', semester: 'Spring 2024' },
  { id: 37, title: 'Biology', description: 'Learn about biology', enrollment: 60, department: 'Biology', semester: 'Fall 2023' },
  { id: 38, title: 'Chemistry', description: 'Learn about chemistry', enrollment: 50, department: 'Chemistry', semester: 'Spring 2024' },
  { id: 39, title: 'Geology', description: 'Learn about geology', enrollment: 40, department: 'Geology', semester: 'Fall 2023' },
  { id: 40, title: 'Astronomy', description: 'Learn about astronomy', enrollment: 30, department: 'Astronomy', semester: 'Spring 2024' },
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
  overflow-y: auto; /* Allow vertical scrolling */
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
  max-height: 80vh; /* Limit height to allow scrolling */
  overflow-y: auto; /* Allow vertical scrolling within the course list */
}

.course-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
}
</style>
