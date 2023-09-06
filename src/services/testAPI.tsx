const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const TAbrandLogin = async (email: any, password: any) => {
    console.log("içerdee")
  try {
    const response = await fetch(`${apiClient.baseURL}/brand/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: apiClient.headers,
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      return response
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAbrandEmailPassword = async (email: any) => {
  console.log('içerdee');

  try {
    const response = await fetch(`${apiClient.baseURL}/brand/auth/passwordEmail`, {
      method: 'POST',
      credentials: 'include',
      headers: apiClient.headers,
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
      return response
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};
