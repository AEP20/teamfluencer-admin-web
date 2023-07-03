import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin`,
  timeout: 5000,
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    credentials: 'include',
    'Access-Control-Allow-Origin': 'https://admin.teamfluencer.co',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  }, // Enable sending cookies with requests
});

// Set up the CORS headers
apiClient.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://admin.teamfluencer.co'; // Replace with your desired allowed origin
apiClient.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
apiClient.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export const TAhealth = async () => {
  try {
    const response = await apiClient.get('/health');

    if (response.status === 200 && response.data.status === 'UP') {
      return response.data;
    } else {
      throw new Error('Health check failed');
    }
  } catch (error) {
    throw error;
  }
};
