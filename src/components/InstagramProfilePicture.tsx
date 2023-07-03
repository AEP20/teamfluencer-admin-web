import React from 'react';
import { InstagramData } from '../types/profileData';

const InstagramProfilePicture = ({ instagramData }: { instagramData: InstagramData }) => {
  return (
    <>
      <div className="flex-column items-center mr-10">
        <h3 className="section-title text-md font-semibold mb-3 text-left"> Instagram Profile:</h3>
        <a href={`https://www.instagram.com/${instagramData.username}`} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center ml-3">
            {instagramData.profile_pic ? (
              <img src={instagramData.profile_pic} alt="instagram_profile" className="rounded-full w-16 h-16 mr-3" />
            ) : (
              <img
                src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                alt="instagram_profile"
                className="rounded-full w-16 h-16 mr-3"
              />
            )}
            <div>
              <h4 className="font-semibold">{instagramData.username}</h4>
              <p className="text-sm text-gray-600">{instagramData.full_name}</p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default InstagramProfilePicture;
