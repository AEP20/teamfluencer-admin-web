const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin-user`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const TAfindUser = async (data: any, token: string) => {
  try {
    const query = data.email
      ? `_email=${data.email}`
      : data.username
      ? `_username=${data.username}`
      : `_phone=${data.phone}`;
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

export const TAfindApprovalUser = async (token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/getverificationprofiles`, {
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

export const TAverifyUser = async (id: string, status: string, token: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/verificateuser/${id}/${status}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
