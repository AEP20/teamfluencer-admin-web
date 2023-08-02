import axios from 'axios';

export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/auth/login';
};

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}/admin`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: any): any => {
    return response;
  },
  (error) => {  
    if (error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED') {
      logoutUser();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
