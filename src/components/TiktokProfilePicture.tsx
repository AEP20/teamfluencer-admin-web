import React from 'react';
import { TiktokData } from '../types/profileData';

const TiktokProfilePicture = ({ tiktokData }: { tiktokData: TiktokData }) => {
  return (
    <>
      <div className="flex-column items-center ml-10">
        <h3 className="section-title text-md font-semibold mb-3 text-left"> Tiktok Profile:</h3>
        <a href={`https://www.tiktok.com/@${tiktokData.username}?lang=en`} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center ml-3">
            {tiktokData.profile_pic ? (
              <img src={tiktokData.profile_pic} alt="tiktok_profile" className="rounded-full w-16 h-16 mr-3" />
            ) : (
              <img
                src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                alt="tiktok_profile"
                className="rounded-full w-16 h-16 mr-3"
              />
            )}
            <div>
              <h4 className="font-semibold">{tiktokData.username}</h4>
              <p className="text-sm text-gray-600">{tiktokData.tiktok_nickname}</p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default TiktokProfilePicture;
