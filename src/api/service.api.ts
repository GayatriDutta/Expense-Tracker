import api from './api';

export const loginAPICall = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data; 
};

export const registerAPICall = async (name: string, email: string, password: string) => {
  const res = await api.post('/users/register', { name, email, password });
  return res.data; 
};
