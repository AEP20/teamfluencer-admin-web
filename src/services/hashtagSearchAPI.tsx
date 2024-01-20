import apiClient from './axiosInstance';

export const TAgetPopularHashtagSearchPost = async (token: string) => {
  try {
    const response = await apiClient.get(`/insta/insta-popular-hashtag-post/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find post failed');
    }
  } catch (error) {
    throw error;
  }
};
