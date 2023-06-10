import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';
import { IRootState } from '../redux/store/index';
import { toggleSidebar } from '../redux/store/themeConfigSlice';
import { TAfindUser } from '../services/userAPI';
import { InstagramData, TiktokData, ProfileData } from '../types/profileData';

const Profile = (data: ProfileData) => {
  console.log('data', data);
  const [birthday, setBirthday] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instagramData, setInstagramData] = useState<InstagramData>({
    last_scrape: null,
    username: '',
    biography: '',
    followers: 0,
    following: 0,
    full_name: '',
    profile_pic: '',
    post_number: 0,
    average_like: 0,
    profile_picture: '',
  });

  const [tiktokData, setTiktokData] = useState<TiktokData>({
    username: '',
    followers: 0,
    following: 0,
    hearts: 0,
    tiktok_nickname: '',
    tiktok_average_like: '',
    tiktok_engagement_rate: 0,
    profile_picture: '',
  });

  const [money, setMoney] = useState(0);
  const [job, setJob] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    setBirthday(data?.birthday ?? '');
    setName(data?.name ?? '');
    setEmail(data?.email ?? '');
    setPhone(data?.phone ?? '');
    setInstagramData(
      data?.instagram ?? {
        last_scrape: null,
        username: '',
        biography: '',
        followers: 0,
        following: 0,
        full_name: '',
        profile_pic: '',
        post_number: 0,
        average_like: 0,
        profile_picture: '',
      },
    );
    setTiktokData(
      data?.tiktok ?? {
        username: '',
        followers: 0,
        following: 0,
        hearts: 0,
        nickname: '',
        average_like: '',
        engagement_rate: 0,
        profile_picture: '',
      },
    );
    setMoney(data?.money?.current ?? 0);
    setJob(data?.job ?? '');
    setCountry(data?.country ?? '');
    setCity(data?.city ?? '');
    setGender(data?.gender ?? '');
  }, [data]);

  return (
    <div className="profile-container bg-gray-100 p-6 rounded-lg shadow-md w-2/3">
      <h2 className="profile-title text-3xl font-medium mb-4">{name}</h2>
      <div className="profile-section bg-white p-4 rounded-lg shadow-sm mb-4 ">
        <h3 className="section-title text-xl font-semibold mb-3 ">Personal Information</h3>
        <table className="table-responsive mb-5">
          <tbody>
            <tr>
              <td className="w-1/3">Birthday:</td> <td>{birthday}</td>
            </tr>
            <tr>
              <td>Email:</td> <td>{email}</td>
            </tr>
            <tr>
              <td>Phone:</td> <td>{phone}</td>
            </tr>
            <tr>
              <td>Job:</td> <td>{job}</td>
            </tr>
            <tr>
              <td>Country:</td> <td>{country}</td>
            </tr>
            <tr>
              <td>City:</td> <td>{city}</td>
            </tr>
            <tr>
              <td>Gender:</td> <td>{gender}</td>
            </tr>
            <tr>
              <td>Money:</td> <td>{money}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="profile-section bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="section-title text-xl font-semibold mb-3">Instagram Data</h3>
        <table className="table-fixed">
          <tbody>
            <tr>
              <td className="w-1/3">Username:</td> <td>{instagramData.username}</td>
            </tr>
            <tr>
              <td>Followers:</td> <td>{instagramData.followers}</td>
            </tr>
            <tr>
              <td>Following:</td> <td>{instagramData.following}</td>
            </tr>
            <tr>
              <td>Biography:</td> <td>{instagramData.biography}</td>
            </tr>
            <tr>
              <td>Full Name:</td> <td>{instagramData.full_name}</td>
            </tr>
            <tr>
              <td>Post Number:</td> <td>{instagramData.post_number}</td>
            </tr>
            <tr>
              <td>Average Like:</td> <td>{instagramData.average_like}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="profile-section bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="section-title text-xl font-semibold mb-3">Tiktok Data</h3>
        <table className="table-fixed">
          <tbody>
            <tr>
              <td className="w-1/3">Username:</td> <td>{tiktokData.username}</td>
            </tr>
            <tr>
              <td>Followers:</td> <td>{tiktokData.followers}</td>
            </tr>
            <tr>
              <td>Following:</td> <td>{tiktokData.following}</td>
            </tr>
            <tr>
              <td>Hearts:</td> <td>{tiktokData.hearts}</td>
            </tr>
            <tr>
              <td>Nickname:</td> <td>{tiktokData.tiktok_nickname}</td>
            </tr>
            <tr>
              <td>Average Like:</td> <td>{tiktokData.tiktok_average_like}</td>
            </tr>
            <tr>
              <td>Engagement Rate:</td> <td>{tiktokData.tiktok_engagement_rate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
