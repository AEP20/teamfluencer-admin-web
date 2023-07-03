import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin/campaign`,
  timeout: 5000,
  withCredentials: true, // Enable sending cookies with requests
});

// Set up the CORS headers
apiClient.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://admin.teamfluencer.co'; // Replace with your desired allowed origin
apiClient.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
apiClient.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

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
  const query = new URLSearchParams({
    id,
    status,
    rejected_reason,
  });

  try {
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
