import apiClient from './axiosInstance';

export const TAfindUser = async (data: any, token: string) => {
  try {
    const query = data.email
      ? `_email=${data.email}`
      : data.username
      ? `_username=${data.username}`
      : `_phone=${data.phone}`;

    const response = await apiClient.get(`/user/getuser?${query}`, {
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

export const TAfindAllUser = async (params: any, token: string) => {
  try {
    const response = await apiClient.get(`/user/getall?${params}`, {
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
    const response = await apiClient.get(`/user/getverificationprofiles`, {
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

export const TAfindAllApprovalUser = async (token: string) => {
  try {
    const response = await apiClient.get(`/user/getallverificationprofiles`, {
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
      `/user/verificateuser/${id}/${status}`,
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

export const TAapprovedUser = async (token: string) => {
  try {
    const response = await apiClient.get(`/user/getverifiedprofiles`, {
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
    const response = await apiClient.get(`/user/getuser/${id}`, {
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
