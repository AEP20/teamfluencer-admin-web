import apiClient from './axiosInstance';

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

    const response = await apiClient.get(`/brand/get${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllBrands = async (token: string) => {
  try {
    const response = await apiClient.get(`/brand/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Brands not found');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindBrandById = async (id: any, token: string) => {
  try {
    const response = await apiClient.get(`/brand/getuser/${id}`, {
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

export const TAupdateBrand = async (id: any, data: any, token: string) => {
  try {
    const response = await apiClient.put(`/brand/update/${id}`, data, {
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

export const TAaddBrandNote = async (id: any, data: any, token: string) => {
  try {
    const response = await apiClient.post(`/brand/addnote/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Add failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAupdateBrandNote = async (id: string, notes: string, token: string) => {
  try {
    const response = await apiClient.put(
      `/brand/updatenote/${id}/${notes}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    console.log('errorrrr girdi');
    throw error;
  }
};

export const TAgetNote = async (id: any, token: string) => {
  console.log('başaaa girdi');

  try {
    const response = await apiClient.get(`/brand/getnote/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('içeriii girdi');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Get failed');
    }
  } catch (error) {
    console.log('errorr aldııı');
    throw error;
  }
};

export const TAdeleteNote = async (id: any, token: string) => {
  console.log('başaaa girdi');

  try {
    const response = await apiClient.delete(`/brand/deletenote/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('içeriii girdi');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Delete failed');
    }
  } catch (error) {
    console.log('errorrr aldııı');
    throw error;
  }
};
