import apiClient from './axiosInstance';

export const TAstatistics = async (token: string) => {
  try {
    const response = await apiClient.get(`/admin/statistics/statisticsnum`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Statistics not found');
    }
  } catch (error) {
    throw error;
  }
};
