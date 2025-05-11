import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login/', { email, password });
    return response.data;
  },
  signup: async (name: string, email: string, password: string, role: string) => {
    const response = await api.post('/auth/register/', { name, email, password, role });
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout/');
    return response.data;
  },
};

export const appointmentsAPI = {
  getAll: async () => {
    const response = await api.get('/appointments/');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/appointments/${id}/`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/appointments/', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/appointments/${id}/`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/appointments/${id}/`);
    return response.data;
  },
};

export const servicesAPI = {
  getAll: async () => {
    const response = await api.get('/services/');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/services/${id}/`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/services/', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/services/${id}/`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/services/${id}/`);
    return response.data;
  },
};

export const clientsAPI = {
  getAll: async () => {
    const response = await api.get('/clients/');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/clients/${id}/`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/clients/', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/clients/${id}/`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/clients/${id}/`);
    return response.data;
  },
};

export default api;