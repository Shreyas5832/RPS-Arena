import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const signup = (username, password) =>
  api.post('/api/auth/signup', { username, password });

export const login = (username, password) =>
  api.post('/api/auth/login', { username, password });

// Game API calls
export const playGame = (userChoice) =>
  api.post('/api/game/play', { userChoice });

export const getLeaderboard = () => api.get('/api/game/leaderboard');

export const getUserStats = () => api.get('/api/game/stats');