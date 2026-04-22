import axios from 'axios';

// Use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_URL,
});

// ─── Contact Endpoints ────────────────────────────────────────────────────────
export const submitContact = (data) => API.post('/contact', data);

// ─── Projects Endpoints (for Portfolio display) ───────────────────────────────
export const getProjects = (params) => API.get('/projects', { params });

// ─── Reviews Endpoints (for testimonials) ─────────────────────────────────────
export const getReviews = () => API.get('/reviews');

// ─── Plans Endpoints (for pricing page) ───────────────────────────────────────
export const getPlans = () => API.get('/plans');

export default API;
