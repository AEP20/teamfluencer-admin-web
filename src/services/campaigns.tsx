import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3000/campaign';

const apiClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 5000,
});

export const TAfindApprovalCampaign = async (token: string) => {
  try {
    const response = await apiClient.get(`/getverificationcampaign`, {
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

export const TAverifyCampaign = async () => {};
