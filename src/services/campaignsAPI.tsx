import apiClient from './axiosInstance';

export const TAdoVisibleCampaign = async (id: string, visibility: any, token: string) => {
  const query = new URLSearchParams({
    id,
    visibility,
  });

  try {
    const response = await apiClient.post(
      `/admin/campaign/visible?${query}`,
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
    const response = await apiClient.get(`/admin/campaign/get${query}`, {
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

export const TAfindApprovedCampaigns = async (page: number, perPage: number, token: string) => {
  try {
    const response = await apiClient.get(`/admin/campaign/getverifiedcampaign?page=${page}&perPage=${perPage}`, {
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

export const TAfindCampaignById = async (_id: any, token: string) => {
  try {
    const response = await apiClient.get(`/admin/campaign/_id/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('response', response);
      throw new Error('Find User failed');
    }
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const TAsetVisibility = async (_id: string, status: boolean = true, token: string) => {
  try {
    const response = await apiClient.get(`/admin/campaign/set-visibilty?status=${status}&_id=${_id}`, {
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

export const TAfindAllCampaigns = async (
  created_at: string,
  country: string,
  platform: string,
  is_verified: string,
  visibility: string,
  max_cost: string,
  gender: string,
  min_follower: string,
  max_follower: string,
  min_age: string,
  max_age: string,
  sortBy: string,
  page: number,
  perPage: number,
  campaign: string,
  token: string,
) => {
  try {
    const response = await apiClient.get(
      `/admin/campaign/getall?created_at=${created_at}&country=${country}&platform=${platform}&is_verified=${is_verified}&visibility=${visibility}&max_cost=${max_cost}&gender=${gender}&min_follower=${min_follower}&max_follower=${max_follower}&min_age=${min_age}&max_age=${max_age}&sortBy=${sortBy}&page=${page}&perPage=${perPage}&campaign=${campaign}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
    const response = await apiClient.get(`/admin/campaign/getverificationcampaign`, {
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

export const TAdoApprovalCampaign = async (status: string, rejected_reason: any, id: string, token: string) => {
  const query = new URLSearchParams({
    id,
    status,
    rejected_reason,
  });

  try {
    const response = await apiClient.post(
      `/admin/campaign/verificate?${query}`,
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

export const TAupdateCampaign = async (id: any, data: any, token: string) => {
  try {
    const response = await apiClient.put(`/admin/campaign/updatecampaign/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    throw error;
  }
};
