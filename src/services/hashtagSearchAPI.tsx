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

export const TAgetHashtagPostsLastThreeMonths = async (
  page: number,
  perPage: number,
  description: string,
  token: string,
) => {
  try {
    const response = await apiClient.get(
      `/insta/insta-hashtag-posts-three-months?page=${page}&perPage=${perPage}&description=${description}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Find post failed');
    }
  } catch (error) {
    throw error;
  }
};
