import apiClient from './axiosInstance';

export const TAstatistics = async (token: string) => {
  try {
    const response = await apiClient.get(`/admin/statistics/statisticsnum`, {
      timeout: 20000, // Set a timeout of 5 seconds
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

export const TargetPopularBrands = async (perPage: any, page: number, token: string) => {
  try {
    const response = await apiClient.get(`/admin/brand/getpopularbrands?perPage=${perPage}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAgetMostContentUsernames = async (perPage: any, page: number, token: string) => {
  try {
    const response = await apiClient.get(`/insta/insta-most-content-usernames?perPage=${perPage}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    throw error;
  }
};