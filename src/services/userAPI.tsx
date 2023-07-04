const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin/user`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    credentials: 'include',
    'Access-Control-Allow-Origin': 'https://admin.teamfluencer.co',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },
};

export const TAfindUser = async (data: any, token: string) => {
  try {
    const query = data.email ? `_email=${data.email}` : `_phone=${data.phone}`;
    const response = await fetch(`${apiClient.baseURL}/getuser?${query}`, {
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

export const TAfindAllUser = async (params: any, token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getall?${params}`, {
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

export const TAfindApprovalUser = async (token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getverificationprofiles`, {
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
      throw new Error('Find Approval Users failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindAllApprovalUser = async (token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getallverificationprofiles`, {
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

export const TAverifyUser = async (id: any, isVerified: boolean, token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/verificateuser/${id}/${isVerified}`, {
      method: 'PUT',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    }
  } catch (error) {
    throw error;
  }
};

export const TAapprovedUser = async (token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getverifiedprofiles`, {
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
      throw new Error('Find Approved User failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAfindUserById = async (id: any, token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getuser/${id}`, {
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
