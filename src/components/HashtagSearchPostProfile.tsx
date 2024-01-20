import React, { useEffect, useState } from 'react';
import { PostData, CaptionData, InfoType } from '../types/hashtagSearchPostData';
import './styles/styles.css';

const HashtagSearchPostProfile = (data: PostData) => {
  const [media_id, setMedia_id] = useState('');
  const [comment_count, setComment_count] = useState(0);
  const [like_count, setLike_count] = useState(0);
  const [caption, setCaption] = useState<CaptionData>({
    pk: '',
    user_id: '',
    type: '',
    text: '',
    media_id: 0,
    user: {
      fbid_v2: '',
      full_name: '',
      id: '',
      is_private: false,
      is_unpublished: false,
      pk: 0,
      pk_id: '',
      strong_id__: '',
      has_anonymous_profile_picture: false,
      is_favorite: false,
      profile_pic_id: '',
      profile_pic_url: '',
      transparency_product_enabled: false,
      username: '',
    },
  });

  useEffect(() => {
    setMedia_id(data?.media_id ?? 'NULL');
    setComment_count(data?.comment_count ?? 'NULL');
    setLike_count(data?.like_count ?? 'NULL');
    setCaption(
      data?.caption[0] ?? {
        pk: '',
        user_id: '',
        type: '',
        text: 'null',
        media_id: 0,
        user: {
          fbid_v2: '',
          full_name: '',
          id: '',
          is_private: false,
          is_unpublished: false,
          pk: 0,
          pk_id: '',
          strong_id__: '',
          has_anonymous_profile_picture: false,
          is_favorite: false,
          profile_pic_id: '',
          profile_pic_url: '',
          transparency_product_enabled: false,
          username: '',
        },
      },
    );
  }, [data]);

  const postInfo: InfoType[] = [
    { key: 'Media ID:', value: media_id },
    { key: 'Comment Count:', value: comment_count },
    { key: 'Like Count:', value: like_count },
    { key: 'Username:', value: caption.user.username },
    { key: 'Caption:', value: caption.text },
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
