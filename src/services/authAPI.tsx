const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin-auth`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const TAlogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: apiClient.headers,
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const TAsignup = async (email: string, password: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/admin-login`, {
      method: 'POST',
      headers: apiClient.headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      var content = await response.json();
      return content;
    } else {
      throw new Error('Signup failed');
    }
  } catch (error) {
    throw error;
  }
};
