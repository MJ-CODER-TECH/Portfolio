import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL || 'https://mj-coder-tech-agency.onrender.com/api';
const normalizeApiUrl = (url) => {
  const trimmed = url.trim().replace(/\/+$|\s+$/g, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};
const API_URL = normalizeApiUrl(rawApiUrl);

const API = axios.create({
  baseURL: API_URL,
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
export const getReviewsAdmin = () => API.get('/reviews/admin/all');
export const approveReview = (id) => API.put(`/reviews/${id}/approve`);
export const deleteReview = (id) => API.delete(`/reviews/${id}`); // ✅ FIXED - uncommented

// Contact
export const getContacts = () => API.get('/contact');
export const updateContactStatus = (id, status) => API.put(`/contact/${id}/status`, { status });
export const deleteContact = (id) => API.delete(`/contact/${id}`);

// Blogs
export const getBlogs = () => API.get('/blogs');
export const getBlogsAdmin = () => API.get('/blogs/admin/all');
export const createBlog = (data) => API.post('/blogs', data);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export default API;