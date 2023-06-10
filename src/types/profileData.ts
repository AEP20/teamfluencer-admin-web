type ProfileData = {
  birthday: string;
  name: string;
  email: string;
  phone: string;
  instagram: InstagramData;
  tiktok: TiktokData;
  money: Money;
  job: string;
  country: string;
  city: string;
  gender: string;
};

type InstagramData = {
  last_scrape: Date | null;
  username: string;
  biography: string;
  followers: number;
  following: number;
  full_name: string;
  profile_pic: string;
  post_number: number;
  average_like: number;
  profile_picture: string;
};

type TiktokData = {
  username: string;
  followers: number;
  following: number;
  hearts: number;
  tiktok_nickname: string;
  tiktok_average_like: string;
  tiktok_engagement_rate: number;
  profile_picture: string;
};

type Money = {
  money: number;
  current: number;
  exchange: object;
};

export type { ProfileData, InstagramData, TiktokData };
