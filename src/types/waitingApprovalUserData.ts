type WaitingApprovalUserData = {
  age: number;
  name: string;
  email: string;
  phone: string;
  profile_complete: string;
  country: string;
  city: string;
  gender: string;
  insta_followers: number;
  insta_post_number: number;
  insta_average_like: number;
  tiktok_followers: number;
  tiktok_videos: number;
  tiktok_average_like: number;
  tiktok_engagement_rate: number;
};

type FilterType = 'min' | 'max';

type Filters = {
  [K in
    | 'age'
    | 'insta_followers'
    | 'insta_average_like'
    | 'tiktok_followers'
    | 'tiktok_average_like'
    | 'tiktok_engagement_rate']: Record<FilterType, string>;
};



export type { WaitingApprovalUserData, FilterType, Filters };
