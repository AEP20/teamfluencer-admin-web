import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000/brand';

const apiClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 5000,
});

export const TafindBrand = async (data: any) => {
  try {
    let query = '';
    if (data.email) {
      query = `?_email=${data.email}`;
    } else if (data.phone) {
      query = `?_phone=${data.phone}`;
    } else if (data.brandname) {
      query = `?_brandname=${data.brandname}`;
    }

    const response = await apiClient.get(`/get${query}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};
