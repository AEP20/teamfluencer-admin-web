import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000/brand';

const apiClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 5000,
});

export const TAfindApprovalCampaign = async () => {
  try {
    const response = await apiClient.get(`/getallverificationcampaigns`);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAverifyCampaign = async () => {};
