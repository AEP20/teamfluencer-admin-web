type WaitingApprovalUserData = {
    age: number;
    name: string;
    email: string;
    phone: string;
    profile_complete: string;
    country: string;
    city: string;
    gender: string;
    followers: number;
    insta_post_number: number;
    average_like: number;
    tiktok_followers: number;
    tiktok_videos: number;
    tiktok_average_like: number;
    tiktok_engagement_rate: number;
    keywords: string[];
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
    followers: FilterValue;
    average_like: FilterValue;
    tiktok_followers: FilterValue;
    tiktok_average_like: FilterValue;
    tiktok_engagement_rate: FilterValue;
    country: CountryFilterValue;
    keywords: string[];
  };
  
  export type { WaitingApprovalUserData, FilterValue, Filters, FilterType, CountryFilterValue };
  