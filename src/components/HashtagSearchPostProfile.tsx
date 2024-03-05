import React, { useEffect, useState } from 'react';
import { PostData, InfoType } from '../types/hashtagSearchPostData';
import './styles/styles.css';

const HashtagSearchPostProfile = (data: PostData) => {
  const [post, setPost] = useState<PostData>({
    media_id: '',
    caption_is_edited: false,
    like_and_view_counts_disabled: false,
    has_shared_to_fb: 0,
    is_unified_video: false,
    commerciality_status: '',
    is_organic_product_tagging_eligible: false,
    like_count: 0,
    media_type: '',
    description: '',
    language: '',
    hashtag: '',
    // tagged_profiles_description: Array,
    tagged_profiles: [
      {
        pk: '',
        pk_id: '',
        id: '',
        username: '',
        full_name: '',
        is_private: false,
        strong_id__: '',
        is_verified: false,
        profile_pic_id: '',
        profile_pic_url: '',
        position: {
          x: 0,
          y: 0,
        },
      },
    ],
    caption_created_at: 0,
    // clips_tab_pinned_user_ids: Array,
    accessibility_caption: '',
    is_in_profile_grid: false,
    user: {
      last_scrape: new Date(),
      full_name: '',
      is_private: false,
      username: '',
      hd_profile_pic_url_info: {
        url: '',
        width: 0,
        height: 0,
      },
      profile_pic_url: '',
      biography: '', // mevcut değil
      followers: 0, // mevcut değil
      following: 0, // mevcut değil
      post_number: 0, // mevcut değil
      average_like: 0, // mevcut değil
      engagement_rate: 0, // mevcut değil
      user_tags: {
        // nadir durum
        id: '',
        full_name: '',
        username: '',
        is_verified: false,
        is_private: false,
        profile_pic_url: '',
        coordinates: {
          x: 0,
          y: 0,
        },
      },
      location: {
        name: '',
        address: '',
        city: '',
        lng: 0,
        lat: 0,
      },
    },
    media_url: {
      url: '',
      width: 0,
      height: 0,
    },
    video_url: '',
    s3_url: '',
    video_duration: 0,
    has_audio: false,
    clips_metadata: {
      // music_info: "",
      original_sound_info: {
        audio_asset_id: '',
        progressive_download_url: '',
      },
      audio_type: '',
      music_canonical_id: '',
      // featured_label: "",
      mashup_info: {},
      // reusable_text_info: "",
      // reusable_text_attribute_string: "",
      // nux_info: "",
      // viewer_interaction_settings: "",
      branded_content_tag_info: {},
      // shopping_info: "",
      additional_audio_info: {},
      is_shared_to_fb: false,
      // breaking_content_info: "",
      // challenge_info: "",
      // reels_on_the_rise_info: "",
      // breaking_creator_info: "",
      // asset_recommendation_info: "",
      // contextual_highlight_info: "",
      clips_creation_entry_point: '',
      audio_ranking_info: {},
      // template_info: "",
      is_fan_club_promo_video: false,
      disable_use_in_clips_client_cache: false,
      // content_appreciation_info: "",
      achievements_info: {},
      show_achievements: false,
      // show_tips: "",
      // merchandising_pill_info: "",
      is_public_chat_welcome_video: false,
      professional_clips_upsell_type: 0,
      // external_media_info: "",
      cutout_sticker_info: {},
    },
    original_width: 0,
    original_height: 0,
    product_type: '',
    is_paid_partnership: false,
    music_metadata: {
      music_canonical_id: '',
      audio_type: '',
      music_info: '',
      original_sound_info: '',
      pinned_media_ids: '',
    },
    comment_threading_enabled: false,
    max_num_visible_preview_comments: 0,
    has_more_comments: false,
    // preview_comments: Array,
    comment_count: 0,
    comments_disabled: false, // nadir durum
    owner: {
      full_name: '',
      id: '',
      is_private: false,
      username: '',
      hd_profile_pic_url_info: {
        url: '',
        width: 0,
        height: 0,
      },
      profile_pic_url: '',
    },
    post_url: '', // postun urlsi
  });

  useEffect(() => {
    setPost(data);
  }, [data]);

  const postInfo: InfoType[] = [
    { key: 'Media ID:', value: String(post.media_id) },
    { key: 'Comment Count:', value: Number(post.comment_count) },
    { key: 'Like Count:', value: Number(post.like_count) },
    { key: 'Username:', value: String(post.user.username) },
    { key: 'description:', value: String(post.description) },
  ];

  return (
    <div className="post-info">
      {postInfo.map((info) => (
        <div key={info.key} className="flex post-info-item">
          <div className="post-info-item-key font-bold">{info.key}</div>
          <div className="pl-4 post-info-item-value">{info.value}</div>
        </div>
      ))}
    </div>
  );
};

export default HashtagSearchPostProfile;
