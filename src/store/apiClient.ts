import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://socialcreator-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('socialcreator_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Setup demo tracking logic if user not authenticated
      let demoId = localStorage.getItem('demo_id');
      if (!demoId) {
        demoId = crypto.randomUUID();
        localStorage.setItem('demo_id', demoId);
      }
      config.headers['x-demo-id'] = demoId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
