import axios from 'axios';

const AUTH_API_URL = 'https://api.teamfluencer.co/campaign';

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

export const TAdoApprovalCampaign = async (status: string, rejected_reason: string, id: string, token: string) => {
  console.log('heeeeee', token);
  const query = new URLSearchParams({
    id,
    status,
    rejected_reason,
  });

  try {
    console.log('url', `/verificate?${query}`);
    const response = await apiClient.put(`/verificate?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
