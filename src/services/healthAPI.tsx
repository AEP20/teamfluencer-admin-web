import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}`,
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
