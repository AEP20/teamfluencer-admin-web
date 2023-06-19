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

type FilterType = 'min' | 'max' | 'value';

type FilterValue = {
  min: string;
  max: string;
};

type CountryFilterValue = {
  value: 'TR' | 'Other' | '' | 'All';
};

type Filters = {
  age: FilterValue;
  insta_followers: FilterValue;
  insta_average_like: FilterValue;
  tiktok_followers: FilterValue;
  tiktok_average_like: FilterValue;
  tiktok_engagement_rate: FilterValue;
  country: CountryFilterValue;
};

export type { WaitingApprovalUserData, FilterValue, Filters, FilterType, CountryFilterValue };
