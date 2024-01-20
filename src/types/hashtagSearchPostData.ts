type PostData = {
  media_id: string;
  caption: CaptionData[];
  comment_count: number;
  like_count: number;
  media_url: string;
};

type CaptionData = {
  pk: string;
  user_id: string;
  user: UserData;
  type: string;
  text: string;
  media_id: number;
};

type UserData = {
  fbid_v2: string;
  full_name: string;
  id: string;
  is_private: boolean;
  is_unpublished: boolean;
  pk: number;
  pk_id: string;
  strong_id__: string;
  has_anonymous_profile_picture: boolean;
  is_favorite: boolean;
  profile_pic_id: string;
  profile_pic_url: string;
  transparency_product_enabled: boolean;
  username: string;
};

type InfoType = {
  key: string;
  value: string | number | boolean | any[];
};

export type { PostData, CaptionData, UserData, InfoType };
