type Limitations = {
  gender?: 'male' | 'female';
  min_follower?: number;
  max_follower?: number;
  min_age?: number;
  max_age?: number;
  school?: string;
  city?: string;
};

type Statistic = {
  date: string;
  views: number;
  shared: number;
  likes: number;
  comments: number;
  price: number;
};

type Details = {
  photo: string[];
  link: string;
  description: string;
};

type ApplicationCounts = {
  first_application?: number;
  waiting_content?: number;
  content_offered?: number;
  content_to_share?: number;
  content_rejected?: number;
  content_shared?: number;
  content_approved?: number;
  account_rejected?: number;
  brand_canceled?: number;
  user_canceled?: number;
  application_done?: number;
};

type CampaignType = {
  _id: string; // Brand's ObjectId
  currency: string;
  country: string;
  name: string;
  cover_photo: string;
  description: string;
  platform: 'insta-post' | 'insta-story' | 'insta-reels' | 'tiktok';
  is_verified: boolean;
  verification: string;
  rejected_reason: string;
  visibility: boolean;
  content_offered: boolean;
  limitations: Limitations;
  max_cost: number;
  total_cost: number;
  details: Details;
};

type Campaign = {
  _id: string; // Brand's ObjectId
  created_at: Date;
  currency: string;
  country: string;
  name: string;
  cover_photo: string;
  description: string;
  platform: 'insta-post' | 'insta-story' | 'insta-reels' | 'tiktok';
  is_verified: boolean;
  verification: string;
  rejected_reason: string;
  visibility: boolean;
  content_offered: boolean;
  limitations: Limitations;
  statistics: Statistic[];
  max_cost: number;
  total_cost: number;
  details: Details;
  application_counts: ApplicationCounts;
  field_of_activity: string;
  brand_description: string;
  content_target_audience: string;
  content_expectations: string;
  content_details: string;
  content_mentions: string;
  content_example_text: string;
  content_metrics: string;
  content_hashtags: string;
  campaign_start: Date;
  campaign_end: Date;
  estimated_budget: number;
  barter: boolean;
  barter_details: string;
  barter_description: string;
  barter_photo: string[];
};

type InfoType = {
  key: string;
  value: string | number | boolean | any[];
};

type campaignFilterType = 'min' | 'max' | 'value';

type campaignFilters = {
  country: string | '';
  platform: 'insta-post' | 'insta-story' | 'insta-reels' | 'tiktok' | '';
  is_verified: 'true' | 'false' | '';
  gender: 'male' | 'female' | '';
  min_followers: number | '';
  max_followers: number | '';
  min_age: number | '';
  max_age: number | '';
};

type CountryFilterValue = {
  value: 'TR' | 'Other' | '' | 'All';
};

type FilterType = 'min' | 'max' | 'value';

type FilterValue = {
  min: string;
  max: string;
};

type Filters = {
  platform: 'insta-post' | 'insta-story' | 'insta-reels' | 'tiktok' | '';
  min_age: FilterValue;
  max_age: FilterValue;
  min_followers: FilterValue;
  max_followers: FilterValue;
  country: CountryFilterValue;
  gender: 'male' | 'female' | '';
  is_verified: 'true' | 'false' | '';
  school?: FilterValue;
  city?: FilterValue;
};

export type {
  Campaign,
  Limitations,
  campaignFilters,
  campaignFilterType,
  Statistic,
  Details,
  ApplicationCounts,
  InfoType,
  CampaignType,
  CountryFilterValue,
  FilterValue,
  Filters,
  FilterType,
};
