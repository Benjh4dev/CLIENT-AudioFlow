import axios from 'axios';
const port = 3002;

// baseURL: `http://localhost:${port}/api`,

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_IP_2,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;