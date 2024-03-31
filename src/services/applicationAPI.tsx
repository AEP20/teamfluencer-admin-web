import apiClient from './axiosInstance';

export const TAfindApplicationByCampaignId
  = async (campaign_id: any, token: string, state: string) => {
    try {
      const response = await apiClient.get(`/admin/application/campaign_id/${campaign_id}?state=${state}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("response", response)
        throw new Error('Find User failed');
      }
    } catch (error) {
      console.log("error: ", error)
      throw error;
    }
  };


export const TACreateApplication = async (applicationUser: {
  insta_username: string,
  age: number,
  gender: string,
  school_type: string,
  // school_name: string,
  city: string,
  country: string,
  language: string,
  currency: string,
  job: string,
  birthday: string,
  verification: boolean,
  hobbies: string[]
}, campaign_id: string, token: string, selectedState: string) => {
  try {
    const response = await apiClient.post(`/admin/application/create`, {
      user: applicationUser, // Make sure this matches ApplicationUserInterface
      campaign_id: campaign_id, // The actual campaign ID
      state: selectedState
    }, {
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("response request : " + response)
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("response", response);
      throw new Error('Creating application failed');
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};


export const TASearchByUsername = async (username: string, token: string) => {
  try {
    const response = await apiClient.get(`/admin/user/search-by-username?username=${username}`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response)
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("response", response);
      throw new Error('Username search failed');
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};
