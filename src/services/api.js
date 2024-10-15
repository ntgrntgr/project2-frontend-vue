import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-api-url',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Add methods for different API calls
  login(credentials) {
    return api.post('/login', credentials);
  },
  getCourses() {
    return api.get('/courses');
  },
  // Add more methods as needed
};
