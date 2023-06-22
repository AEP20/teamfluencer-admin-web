import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000/admin';

const apiClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 5000,
});

export const TAlogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/signin', {
      email,
      password,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAsignup = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/admin/login', {
      email,
      password,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Signup failed');
    }
  } catch (error) {
    throw error;
  }
};
