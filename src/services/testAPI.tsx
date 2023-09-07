const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const email = 'ogokcekoca1@gmail.com';
const password = '123456789';

export const TAbrandLogin = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}/brand/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: apiClient.headers,
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAbrandEmailPassword = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}/brand/auth/passwordEmail`, {
      method: 'POST',
      credentials: 'include',
      headers: apiClient.headers,
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAuserAuth = async () => {
  const phone = '+905516321224';
  const firebase_id = 'wGgYYpfPSjPB2jV1IkkBhQr6dZD3';
  const language = 'tr';
  try {
    const response = await fetch(`${apiClient.baseURL}/user/auth`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, firebase_id, language }),
    });
    const data = await response.json();
    const token = data.token;
    if (response.status === 200) {
      return token;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAuserEngagementRate = async (token: any) => {
  const user_id = '5f92c6dbdff25a7f3dccd175';
  try {
    const response = await fetch(`${apiClient.baseURL}/user/engagement`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id }),
    });
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};
