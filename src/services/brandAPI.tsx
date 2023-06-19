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
      query = `?email=${data.email}`;
    } else if (data.phone) {
      query = `?phone=${data.phone}`;
    } else if (data.brandname) {
      query = `?brand_name=${data.brandname}`;
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

export const TAfindAllBrands = async () => {
  try {
    const response = await apiClient.get(`/getall`);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};
