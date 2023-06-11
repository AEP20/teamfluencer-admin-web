import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../redux/store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../redux/store';
import { useState, useEffect } from 'react';
import React from 'react';
import { InstagramData, TiktokData, ProfileData, MoneyData, SharedPostData } from '../types/profileData';

const InstagramProfilePicture = ({ instagramData }: { instagramData: InstagramData }) => {
  console.log('instagramData', instagramData);
  return (
    <>
      <div className="flex-column items-center mr-10">
        <h3 className="section-title text-md font-semibold mb-3 text-left"> Instagram Profile:</h3>
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
      </div>
    </>
  );
};

export default InstagramProfilePicture;
