import axios from 'axios';

const api = axios.create({
  baseURL: 'VITE_API_URL=https://your-render-backend.onrender.com', 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
