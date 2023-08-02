import apiClient from './axiosInstance';

export const TAdoVisibleCampaign = async (id: string, visibility: any, token: string) => {
  const query = new URLSearchParams({
    id,
    visibility,
  });

  try {
    const response = await apiClient.post(
      `/admin-campaign/visible?${query}`,
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
export const TAfindCampaign = async (data: any, token: string) => {
  let query = '';
  if (data.name) {
    query = `?name=${data.name}`;
  }

  try {
    const response = await apiClient.get(`/admin-campaign/get${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Find Campaign failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindApprovedCampaigns = async (token: string) => {
  try {
    const response = await apiClient.get(`/admin-campaign/getverifiedcampaign`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find Campaign failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllCampaigns = async (token: string) => {
  try {
    const response = await apiClient.get(`/admin-campaign/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find Campaign failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindApprovalCampaign = async (token: string) => {
  try {
    const response = await apiClient.get(`/admin-campaign/getverificationcampaign`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find Campaign failed');
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
    const response = await apiClient.post(
      `/admin-campaign/verificate?${query}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Approval Campaign failed');
    }
  } catch (error) {
    throw error;
  }
};
