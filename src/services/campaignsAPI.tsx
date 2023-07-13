const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin-campaign`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const TAfindCampaign = async (data: any, token: string) => {
  try {
    let query = '';
    if (data.name) {
      query = `?name=${data.name}`;
    }

    const response = await fetch(`${apiClient.baseURL}/get${query}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      throw new Error('Find Campaign failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllCampaigns = async (token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getall`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export const TAfindApprovalCampaign = async (token: string) => {
  try {
    console.log("token : ", token,)

    const response = await fetch(`${apiClient.baseURL}/getverificationcampaign`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("response", response)

    if (response.status === 200) {
      var content = await response.json();
      return content;
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
    const response = await fetch(`${apiClient.baseURL}/verificate?${query}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
