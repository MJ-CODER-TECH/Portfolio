import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');
export const changePassword = (data) => API.put('/auth/change-password', data);

// Projects
export const getProjects = (params) => API.get('/projects', { params });
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Plans
export const getPlans = () => API.get('/plans');
export const createPlan = (data) => API.post('/plans', data);
export const updatePlan = (id, data) => API.put(`/plans/${id}`, data);
export const deletePlan = (id) => API.delete(`/plans/${id}`);

// Reviews
export const getReviews = () => API.get('/reviews');
export const approveReview = (id) => API.put(`/reviews/${id}/approve`);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

// Contact
export const getContacts = () => API.get('/contact');
export const updateContactStatus = (id, status) => API.put(`/contact/${id}/status`, { status });
export const deleteContact = (id) => API.delete(`/contact/${id}`);

export default API;