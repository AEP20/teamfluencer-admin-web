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

    const response = await apiClient.get(`/admin/brand/get${query}`, {
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

export const TAfindBrandName = async (data: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/brand/brandname?brand_name=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllBrands = async (page: number, perPage: number, brand: string, token: string) => {
  try {
    const response = await apiClient.get(`/admin/brand/getall?page=${page}&perPage=${perPage}&brand=${brand}`, {
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
    const response = await apiClient.get(`/admin/brand/get/${id}`, {
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
    const response = await apiClient.put(`/admin/brand/update/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('response.data', response.data.brand_logo);
      return response.data;
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAupdateBrandNote = async (id: string, notes: string, token: string) => {
  try {
    const response = await apiClient.put(
      `/admin/brand/updatenote/${id}/${notes}`,
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
    throw error;
  }
};

export const TAdeleteNote = async (id: any, token: string) => {
  try {
    const response = await apiClient.delete(`admin/brand/deletenote/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Delete failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAaddBalance = async (id: any, balance: number, token: string) => {
  try {
    const response = await apiClient.put(`/admin/brand/addbalance/${id}/${balance}`, {
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
