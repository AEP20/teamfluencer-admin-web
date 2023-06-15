import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 5000,
});

export const TAhealth = async () => {
  try {
    const response = await apiClient.get('/health');

    if (response.status === 200 && response.data.status === 'UP') {
      return response.data;
    } else {
      throw new Error('Health check failed');
    }
  } catch (error) {
    throw error;
  }
};
