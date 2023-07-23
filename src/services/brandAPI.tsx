const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/brand`,
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllBrands = async (token: string) => {
  try {
    const response: any = await fetch(`${apiClient.baseURL}/getall`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      throw new Error('Brands not found');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindBrandById = async (id: any, token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getuser/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export const TAupdateBrand = async (id: any, data: any, token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/update/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const content = await response.json();
      return content;
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    throw error;
  }
};
