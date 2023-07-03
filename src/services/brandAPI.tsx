import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin/brand`,
  timeout: 5000,
  withCredentials: true, // Enable sending cookies with requests
});

// Set up the CORS headers
apiClient.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://admin.teamfluencer.co'; // Replace with your desired allowed origin
apiClient.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
apiClient.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

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
