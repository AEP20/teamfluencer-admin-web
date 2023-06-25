import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/brand`,
  timeout: 5000,
});

export const TAfindBrand = async (data: any, token: string) => {
  try {
    let query = '';
    if (data.email) {
      query = `?email=${data.email}`;
    } else if (data.phone) {
      query = `?phone=${data.phone}`;
    } else if (data.brandname) {
      query = `?brand_name=${data.brandname}`;
    }

    const response = await apiClient.get(`/get${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllBrands = async (token: string) => {
  try {
    const response = await apiClient.get(`/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};


export const TAfindBrandById = async (id: any, token: string) => {
  try {
    const response = await apiClient.get(`/getuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};
