import React from 'react';
import { PostData } from '../types/hashtagSearchPostData';

const PostPicture = ({ postData }: { postData: PostData | null }) => {
  if (!postData) {
    return null;
  }
  return (
    <>
      <div className="flex-column items-center mr-10 mb-12">
        <a href={`${postData.media_url}`} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center ml-3">
            {postData.media_url ? (
              <img src={postData.media_url} alt="instagram_profile" className="rounded-md mr-3" />
            ) : (
              <img
                src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                alt="instagram_profile"
                className="rounded-full w-16 h-16 mr-3"
              />
            )}
          </div>
        </a>
      </div>
    </>
  );
};

export default PostPicture;
