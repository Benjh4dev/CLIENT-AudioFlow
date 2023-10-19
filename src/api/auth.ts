import api from '@/services/api';

interface RegisterCredentials {
    username: string;
    password: string;
    email: string;
};

interface LoginCredentials {
    email: string;
    password: string;
};

export async function login(credentials: LoginCredentials) {
  const response = await api.post('/auth', credentials);
  return response.data;
};

export async function register(credentials: RegisterCredentials) {
  const response = await api.post('/user/', credentials);
  return response.data;
};