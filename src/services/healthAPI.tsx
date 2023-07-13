const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin-healthcheck`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const TAhealth = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}`, {
      method: 'GET',
      headers: apiClient.headers,
    });

    if (response.status === 200) {
      const responseData = await response.json();
      if (responseData.status === 'UP') {
        return responseData;
      } else {
        throw new Error('Health check failed');
      }
    } else {
      throw new Error('Health check failed');
    }
  } catch (error) {
    throw error;
  }
};
