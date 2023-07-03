import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin/auth`,
  timeout: 10000,
  withCredentials: true, 
  headers: {
    "credentials": "include",
    'Access-Control-Allow-Origin': "https://admin.teamfluencer.co",
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },// Enable sending cookies with requests
});

// Set up the CORS headers
apiClient.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://admin.teamfluencer.co'; // Replace with your desired allowed origin
apiClient.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
apiClient.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';


export const TAlogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/signin', {
      email,
      password,
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

export const TAsignup = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/admin/login', {
      email,
      password,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Signup failed');
    }
  } catch (error) {
    throw error;
  }
};
