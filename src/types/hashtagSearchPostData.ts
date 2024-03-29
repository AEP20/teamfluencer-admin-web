type PostData = {
  media_id: String;
  caption_is_edited: Boolean;
  like_and_view_counts_disabled: Boolean;
  has_shared_to_fb: Number;
  is_unified_video: Boolean;
  commerciality_status: String;
  is_organic_product_tagging_eligible: Boolean;
  like_count: Number;
  media_type: String;
  description: String;
  language: String;
  hashtag: String;
  // tagged_profiles_description: Array;
  tagged_profiles: [
    {
      pk: String;
      pk_id: String;
      id: String;
      username: String;
      full_name: String;
      is_private: Boolean;
      strong_id__: String;
      is_verified: Boolean;
      profile_pic_id: String;
      profile_pic_url: String;
      position: {
        x: Number;
        y: Number;
      };
    },
  ];
  caption_created_at: Number;
  // clips_tab_pinned_user_ids: Array;
  accessibility_caption: String;
  is_in_profile_grid: Boolean;
  user: {
    last_scrape: Date;
    full_name: String;
    is_private: Boolean;
    username: String;
    hd_profile_pic_url_info: {
      url: String;
      width: Number;
      height: Number;
    };
    profile_pic_url: String;
    biography: String; // mevcut değil
    followers: Number; // mevcut değil
    following: Number; // mevcut değil
    post_number: Number; // mevcut değil
    average_like: Number; // mevcut değil
    engagement_rate: Number; // mevcut değil
    user_tags: {
      // nadir durum
      id: String;
      full_name: String;
      username: String;
      is_verified: Boolean;
      is_private: Boolean;
      profile_pic_url: String;
      coordinates: {
        x: Number;
        y: Number;
      };
    };
    location: {
      name: String;
      address: String;
      city: String;
      lng: Number;
      lat: Number;
    };
  };
  media_url: {
    url: String;
    width: Number;
    height: Number;
  };
  video_url: String;
  s3_url: String;
  video_duration: Number;
  has_audio: Boolean;
  clips_metadata: {
    // music_info: String,
    original_sound_info: {
      audio_asset_id: String;
      progressive_download_url: String;
    };
    audio_type: String;
    music_canonical_id: String;
    // featured_label: String,
    mashup_info: {};
    // reusable_text_info: String,
    // reusable_text_attribute_string: String,
    // nux_info: String,
    // viewer_interaction_settings: String,
    branded_content_tag_info: {};
    // shopping_info: String,
    additional_audio_info: {};
    is_shared_to_fb: Boolean;
    // breaking_content_info: String,
    // challenge_info: String,
    // reels_on_the_rise_info: String,
    // breaking_creator_info: String,
    // asset_recommendation_info: String,
    // contextual_highlight_info: String,
    clips_creation_entry_point: String;
    audio_ranking_info: {};
    // template_info: String,
    is_fan_club_promo_video: Boolean;
    disable_use_in_clips_client_cache: Boolean;
    // content_appreciation_info: String,
    achievements_info: {};
    show_achievements: Boolean;
    // show_tips: String,
    // merchandising_pill_info: String,
    is_public_chat_welcome_video: Boolean;
    professional_clips_upsell_type: Number;
    // external_media_info: String,
    cutout_sticker_info: {};
  };
  original_width: Number;
  original_height: Number;
  product_type: String;
  is_paid_partnership: Boolean;
  music_metadata: {
    music_canonical_id: String;
    audio_type: String;
    music_info: String;
    original_sound_info: String;
    pinned_media_ids: String;
  };
  comment_threading_enabled: Boolean;
  max_num_visible_preview_comments: Number;
  has_more_comments: Boolean;
  // preview_comments: Array;
  comment_count: Number;
  comments_disabled: Boolean; // nadir durum
  owner: {
    full_name: String;
    id: String;
    is_private: Boolean;
    username: String;
    hd_profile_pic_url_info: {
      url: String;
      width: Number;
      height: Number;
    };
    profile_pic_url: String;
  };
  post_url: String; // postun urlsi
};

type InfoType = {
  key: string;
  value: string | number | boolean | any[]
};

export type { PostData, InfoType };
