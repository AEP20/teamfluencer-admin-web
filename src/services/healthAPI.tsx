import apiClient from './axiosInstance';

export const TAhealth = async () => {
  try {
    const response = await apiClient.get('/admin-healthcheck');

    if (response.status === 200) {
      const responseData = response.data;
      if (responseData.status === 'UP') {
        return responseData;
      } else {
        throw new Error('Health check failed');
      }
    } else {
      throw new Error('Health check failed');
    }
  } catch (error) {
    throw error;
  }
};
