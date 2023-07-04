const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin/auth`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

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

    const response = await fetch(`${apiClient.baseURL}/get${query}`, {
      method: 'GET',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllBrands = async (token: string) => {
  try {
    const response: any = await fetch(`${apiClient.baseURL}/getall`, {
      method: 'GET',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindBrandById = async (id: any, token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getuser/${id}`, {
      method: 'GET',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};
