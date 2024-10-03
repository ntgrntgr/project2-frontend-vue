<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from './Navbar.vue';
import axios from 'axios'; // Import axios for API calls
import { saveAs } from 'file-saver';

const courses = ref([]);
const departments = ref([]);
const selectedDepartment = ref('All');
const exportFormat = ref('CSV');
const isLoading = ref(true); // Loading state
const selectedCourse = ref(null); // To store the selected course for details
const newCourse = ref({
  title: '',
  description: '',
  dept: '',
  level: '',
  hours: ''
}); // To store new course details
const showAddCourseModal = ref(false); // Control visibility of the add course modal

const filteredCourses = computed(() => {
  return courses.value.filter(course => 
    (selectedDepartment.value === 'All' || course.dept === selectedDepartment.value)
  );
});

// Fetch courses from the backend API
const fetchCourses = async () => {
  const cachedCourses = localStorage.getItem('courses');
  if (cachedCourses) {
    courses.value = JSON.parse(cachedCourses);
    departments.value = ['All', ...new Set(courses.value.map(course => course.dept))];
    isLoading.value = false; // Set loading to false
    return;
  }

  try {
    const response = await axios.get('http://localhost:3100/api/lessons'); 
    courses.value = response.data.map(course => ({
      ...course,
      description: course.description || "None"
    }));
    localStorage.setItem('courses', JSON.stringify(courses.value));
    const uniqueDepartments = [...new Set(courses.value.map(course => course.dept))];
    departments.value = ['All', ...uniqueDepartments];
  } catch (error) {
    console.error('Error fetching courses:', error.response || error.message);
  } finally {
    isLoading.value = false; // Set loading to false
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
    saveAs(new Blob([csvContent]), 'courses.csv');
  } else if (exportFormat.value === 'PDF') {
    alert('PDF export functionality is not implemented yet.');
  }
};

const openCourseDetails = (course) => {
  selectedCourse.value = course;
};

const closeDetails = () => {
  selectedCourse.value = null;
};

// Method to handle adding a new course
const addNewCourse = async () => {
  try {
    const response = await axios.post('http://localhost:3100/api/lessons', newCourse.value);
    courses.value.push(response.data); // Add new course to the local list
    newCourse.value = { title: '', description: '', dept: '', level: '', hours: '' }; // Reset the form
    showAddCourseModal.value = false; // Close modal
  } catch (error) {
    console.error('Error adding course:', error.response || error.message);
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
          <button class="add-course-btn" @click="showAddCourseModal = true">+</button>
        </div>

        <div v-if="isLoading" class="loading-indicator">Loading courses...</div>

        <div class="course-list" v-else>
          <div v-for="course in filteredCourses" :key="course.id" class="course-card" @click="openCourseDetails(course)">
            <h2>{{ course.course_number }}: {{ course.name }}</h2>
            <p><strong>Department:</strong> {{ course.dept }}</p>
            <p><strong>Level:</strong> {{ course.level }}</p>
            <p><strong>Hours:</strong> {{ course.hours }}</p>
            <p class="description" :title="course.description">
              {{ course.description.length > 30 ? course.description.slice(0, 30) + '...' : course.description }}
            </p>
          </div>
        </div>

        <!-- Course Details Modal -->
        <div v-if="selectedCourse" class="modal" @click.self="closeDetails">
          <div class="modal-content">
            <span class="close" @click="closeDetails">&times;</span>
            <h2>{{ selectedCourse.course_number }}: {{ selectedCourse.name }}</h2>
            <p><strong>Department:</strong> {{ selectedCourse.dept }}</p>
            <p><strong>Level:</strong> {{ selectedCourse.level }}</p>
            <p><strong>Hours:</strong> {{ selectedCourse.hours }}</p>
            <p><strong>Description:</strong> {{ selectedCourse.description }}</p>
          </div>
        </div>

        <!-- Add Course Modal -->
        <div v-if="showAddCourseModal" class="modal" @click.self="showAddCourseModal = false">
          <div class="modal-content">
            <span class="close" @click="showAddCourseModal = false">&times;</span>
            <h2>Add New Course</h2>
            <form @submit.prevent="addNewCourse">
              <label>
                Title:
                <input type="text" v-model="newCourse.title" required />
              </label>
              <label>
                Description:
                <input type="text" v-model="newCourse.description" required />
              </label>
              <label>
                Department:
                <input type="text" v-model="newCourse.dept" required />
              </label>
              <label>
                Level:
                <input type="text" v-model="newCourse.level" required />
              </label>
              <label>
                Hours:
                <input type="number" v-model="newCourse.hours" required />
              </label>
              <button type="submit">Add Course</button>
            </form>
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

.add-course-btn { /* push this button to the far right for nice look*/
  margin-left: auto; /* Push it to the right */
  padding: 0.01rem 0.1rem;
  font-size: .9rem;
  cursor: pointer;
}

.add-new-course-container{

  background-color: rgba(0, 0, 0, 0.5);

}

.loading-indicator {
  font-size: 1.5rem;
  color: #333;
  margin: 1rem;
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
  cursor: pointer;
  transition: background-color 0.3s;
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Modal styles */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: rgba(0, 0, 0, 0.5);
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
