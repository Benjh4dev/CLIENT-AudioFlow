import axios from 'axios';
const port = 3002;

const api = axios.create({
  // baseURL: `http://localhost:${port}/api`,
  baseURL: import.meta.env.VITE_BACKEND_IP,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;