const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin/auth`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const TAfindApprovalCampaign = async (token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getverificationcampaign`, {
      method: 'GET',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
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
    const response = await fetch(`${apiClient.baseURL}/verificate?${query}`, {
      method: 'PUT',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
