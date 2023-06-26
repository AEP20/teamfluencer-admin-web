import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/auth`,
  timeout: 10000,
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
