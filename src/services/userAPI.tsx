import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000/user';

const apiClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 5000,
});

export const TAfindUser = async (data: any) => {
  try {
    const response = await apiClient.get(`/getuser${data.email ? `?_email=${data.email}` : `?_phone=${data.phone} `}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindApprovalUser = async () => {
  console.log('TAfindApprovalUser');
  try {
    const response = await apiClient.get(`/getverificationprofiles`);
    console.log('ham', response);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllApprovalUser = async () => {
  try {
    const response = await apiClient.get(`/getallverificationprofiles`);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAverifyUser = async (id: any, isVerified: boolean) => {
  try {
    const response = await apiClient.put(`/verificateuser/${id}/${isVerified}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
