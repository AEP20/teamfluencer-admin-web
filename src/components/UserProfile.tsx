import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';
import { IRootState } from '../redux/store/index';
import { toggleSidebar } from '../redux/store/themeConfigSlice';
import { TAfindUser } from '../services/userAPI';
import { InstagramData, TiktokData, ProfileData, MoneyData, SharedPostData } from '../types/profileData';
import InstagramSharedPosts from './InstagramSharedPosts';
import TiktokProfilePicture from './TiktokProfilePicture';
import InstagramProfilePicture from './InstagramProfilePicture';
import ReadMore from './ReadMore';
import './styles/styles.css';

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
    keywords: [],
    shared_posts: [],
  });

  const [tiktokData, setTiktokData] = useState<TiktokData>({
    username: '',
    followers: 0,
    following: 0,
    hearts: 0,
    tiktok_nickname: '',
    tiktok_average_like: '',
    tiktok_engagement_rate: 0,
    profile_pic: '',
    verified: false,
    privateAccount: false,
    keywords: [],
  });

  const [moneyData, setMoneyData] = useState<MoneyData>({
    current: 0,
    exchanges: {},
    paparaAccountNo: '',
  });

  const [sharedPostData, setSharedPostData] = useState<Array<SharedPostData>>([]);
  console.log('sharedPostData', sharedPostData);

  const [job, setJob] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [isWaitingVerification, setIsWaitingVerification] = useState(false);

  useEffect(() => {
    setBirthday(data?.birthday ?? '');
    setName(data?.name ?? '');
    setEmail(data?.email ?? '');
    setPhone(data?.phone ?? '');
    setIsWaitingVerification(data?.isWaitingVerification ?? false);
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
        keywords: [],
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
        verified: false,
        privateAccount: false,
        keywords: [],
      },
    );
    setMoneyData(
      data?.money ?? {
        current: 0,
        exchange: {},
        paparaAccountNo: '',
      },
    );

    setJob(data?.job ?? '');
    setCountry(data?.country ?? '');
    setCity(data?.city ?? '');
    setGender(data?.gender ?? '');

    const validSharedPosts =
      data?.instagram.shared_posts?.map((post) => {
        if (post.location === undefined) {
          return { ...post, location: { name: 'unknown' } }; // Or any other default value
        }
        return post;
      }) ?? [];
    setSharedPostData(validSharedPosts);
  }, [data]);

  return (
    <>
      <div className="profile-container p-4 rounded-lg  w-2/3">
        <div className="flex items-center mb-20">
          <div className="flex flex-row items-center mr-16">
            <InstagramProfilePicture instagramData={instagramData} />
            <TiktokProfilePicture tiktokData={tiktokData} />
          </div>
        </div>
      </div>
      <div className="profile-section bg-white p-3 shadow-md mb-3">
        <h3 className="section-title text-lg font-semibold mb-3">Personal Information</h3>
        <table className="table-responsive">
          <tbody>
            <tr>
              <td>Name:</td> <td>{name}</td>
            </tr>
            <tr>
              <td>Birthday:</td> <td>{birthday}</td>
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
              <td>Money:</td> <td>{moneyData.current}</td>
            </tr>
            <tr>
              <td>Papara Account No:</td> <td>{moneyData.paparaAccountNo}</td>
            </tr>
            <tr>
              <td>Waiting Verification:</td> <td>{isWaitingVerification ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="profile-section bg-white p-3  shadow-md mb-3">
        <h3 className="section-title text-lg font-semibold mb-3">Instagram Data</h3>
        <table className="table-responsive">
          <tbody>
            <tr>
              <td>Username:</td> <td>{instagramData.username}</td>
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
            <tr>
              <td>Keywords:</td>
              <td>
                {instagramData.keywords && instagramData.keywords.slice(0, 50).join(', ')}
                {instagramData.keywords && instagramData.keywords.length > 50 && '...'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="profile-section bg-white p-3 shadow-md mb-3">
        <h3 className="section-title text-lg font-semibold mb-3">Tiktok Data</h3>
        <table className="table-responsive">
          <tbody>
            <tr>
              <td>Username:</td> <td>{tiktokData.username}</td>
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
            <tr>
              <td>Verified:</td> <td>{tiktokData.verified ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Private Account:</td> <td>{tiktokData.privateAccount ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Keywords:</td> <td>{tiktokData.keywords.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {sharedPostData.map((post) => (
          <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden max-w-xs mx-auto">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover zoom" src={post.media_url} alt={post.description} />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{post.location.name}</div>
              {post.description && post.description.length > 150 ? (
                <ReadMore content={post.description} maxCharacterCount={150} />
              ) : (
                <p className="text-gray-700 text-base">{post.description}</p>
              )}
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Likes: {post.like_count}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Comments: {post.comment_count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
