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

export const TAtcNoControl = async (
  tcNo: string,
  firstName: string,
  lastName: string,
  birthYear: string,
  token: string,
) => {
  try {
    const response = await apiClient.post(
      `/admin/statistics/tcnocontrol?tcNo=${tcNo}&firstName=${firstName}&lastName=${lastName}&birthYear=${birthYear}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Statistics not found');
    }
  } catch (error) {
    throw error;
  }
};
