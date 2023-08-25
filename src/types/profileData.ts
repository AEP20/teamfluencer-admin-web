type ProfileData = {
  _id: string;
  birthday: string;
  name: string;
  email: string;
  phone: string;
  instagram: InstagramData;
  tiktok: TiktokData;
  money: MoneyData;
  job: string;
  country: string;
  city: string;
  gender: string;
  isWaitingVerification: boolean;
  deleted: string;
};

type InstagramData = {
  last_scrape: Date | null;
  username: string;
  biography: string;
  followers: number;
  following: number;
  full_name: string;
  post_number: number;
  average_like: number;
  profile_pic: string;
  keywords: string[];
  shared_posts: SharedPostData[];
};

type TiktokData = {
  username: string;
  followers: number;
  following: number;
  hearts: number;
  tiktok_nickname: string;
  tiktok_average_like: string;
  tiktok_engagement_rate: number;
  profile_pic: string;
  verified: boolean;
  privateAccount: boolean;
  keywords: string[];
};

type MoneyData = {
  current: number;
  exchanges: {
    [key: string]: number;
  };
  paparaAccountNo: string;
};

type SharedPostData = {
  comment_count: number;
  description: string;
  location: {
    name: string;
  };
  media_url: string;
  like_count: number;
  _id: string;
};

type InfoType = {
  key: string;
  value: string | number | boolean | any[];
};

type VideosData = {
  comment_count: number;
  cover: string;
  description: string;
  download_count: number;
  dynamicCover: string;
  like_count: number;
  media_url: string;
  music: string;
  play_count: number;
  region: string;
  share_count: number;
  _id: string;
};

export type { ProfileData, InstagramData, TiktokData, MoneyData, SharedPostData, InfoType, VideosData };
