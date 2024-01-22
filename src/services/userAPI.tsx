import apiClient from './axiosInstance';

export const TAfindUser = async (data: any, token: string) => {
  try {
    const query = data.email
      ? `_email=${data.email}`
      : data.username
      ? `_username=${data.username}`
      : `_phone=${data.phone}`;

    const response = await apiClient.get(`/admin/user/getuser?${query}`, {
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

export const TAfindUsername = async (data: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getusername?username=${data}`, {
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

export const TAfindCountry = async (data: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getcountry?country=${data}`, {
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

export const TAfindCity = async (data: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getcity?city=${data}`, {
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

export const TAfindJob = async (data: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getjob?job=${data}`, {
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

export const TAfindHobbies = async (data: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/gethobbies?hobbies=${data}`, {
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

export const TAfindAllUser = async (page: number, params: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getall?${params}&page=${page}`, {
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

export const TAfindApprovalUser = async (token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getverificationprofiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find Approval Users failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllApprovalUser = async (page: number, perPage: number, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getallverificationprofiles?page=${page}&perPage=${perPage}`, {
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

export const TAverifyUser = async (id: string, status: string, token: string) => {
  try {
    const response = await apiClient.post(
      `/admin/user/verificateuser/${id}/${status}`,
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
    }
  } catch (error) {
    throw error;
  }
};

export const TAapprovedUser = async (page: number, perPage: number, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getverifiedprofiles?page=${page}&perPage=${perPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find Approved User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindUserById = async (id: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/getuser/${id}`, {
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

export const TArecoverAccount = async (id: string, status: string, token: string) => {
  try {
    const response = await apiClient.post(
      `/admin/user/recoveraccount/${id}/${status}`,
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
    }
  } catch (error) {
    throw error;
  }
};

export const TAchangePhone = async (id: string, phone: string, token: string) => {
  try {
    const response = await apiClient.post(
      `/admin/user/changephone/${id}/${phone}`,
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
    }
  } catch (error) {
    throw error;
  }
};
