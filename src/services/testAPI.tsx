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
  const user = {
    phone: '+905516321224',
    firebase_id: 'wGgYYpfPSjPB2jV1IkkBhQr6dZD3',
    language: 'tr',
  };
  try {
    const response = await fetch(`${apiClient.baseURL}/user/auth`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
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

export const TAuserEngagementRate = async (token: string) => {
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

export const TAcreateCampaign = async () => {
  const country = 'turkey';
  const name = 'Kampanya adı';
  const cover_photo = 'https://image.com';
  const description = 'Kampanya açıklaması';
  const platform = 'insta-post';
  const currency = 'TRY';

  try {
    const response = await fetch(`${apiClient.baseURL}/campaign/create-new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, currency, name, cover_photo, description, platform }),
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

export const TAdeleteCampaign = async (campaign_id: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/campaign/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ campaign_id }),
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