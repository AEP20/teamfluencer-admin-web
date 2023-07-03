import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin/user`,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': "https://admin.teamfluencer.co",
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },
});

export const TAfindUser = async (data: any, token: string) => {
  try {
    const response = await apiClient.get(`/getuser${data.email ? `?_email=${data.email}` : `?_phone=${data.phone} `}`, {
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
    const response = await apiClient.get(`/getall?${params}`, {
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

export const TAfindApprovalUser = async (token: string) => {
  try {
    const response = await apiClient.get(`/getverificationprofiles`, {
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

export const TAfindAllApprovalUser = async (token: string) => {
  try {
    const response = await apiClient.get(`/getallverificationprofiles`, {
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

export const TAverifyUser = async (id: any, isVerified: boolean, token: string) => {
  try {
    const response = await apiClient.put(
      `/verificateuser/${id}/${isVerified}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const TAapprovedUser = async (token: string) => {
  try {
    const response = await apiClient.get(`/getverifiedprofiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find Approved User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindUserById = async (id: any, token: string) => {
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
