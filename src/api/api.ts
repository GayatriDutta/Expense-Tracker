import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expense-tracker-backend-1-4qxv.onrender.com', 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
