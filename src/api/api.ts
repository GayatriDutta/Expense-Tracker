import axios from 'axios';
import { showSuccess, showError } from '../utils/toast';
export const BASE_URL = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: BASE_URL, // Backend URL
  
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      showSuccess(response.data.message);
    }
    return response;
  },
  (error) => {
    let message = "Something went wrong!";

    if (error.response) {
      if (error.response.data?.message) {
        message = error.response.data.message;
      } else if (error.response.status === 401) {
        message = "Unauthorized! Please login again.";
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        message = "Server error. Please try again later.";
      }
    } else if (error.message === "Network Error") {
      message = "Network error. Please check your internet connection.";
    }

    showError(message);
    return Promise.reject(error);
  }
);

export default api;
