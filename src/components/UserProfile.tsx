import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';
import { IRootState } from '../redux/store/index';
import { toggleSidebar } from '../redux/store/themeConfigSlice';
import { TAfindUser } from '../services/userAPI';
import { InstagramData, TiktokData, ProfileData, MoneyData, SharedPostData, InfoType } from '../types/profileData';
import InstagramSharedPosts from './InstagramSharedPosts';
import TiktokProfilePicture from './TiktokProfilePicture';
import InstagramProfilePicture from './InstagramProfilePicture';
import ReadMore from './ReadMore';
import './styles/styles.css';

const UserProfile = (data: ProfileData) => {
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
    tiktok_average_likes: '',
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

  const personalInfo: InfoType[] = [
    { key: 'Name:', value: name },
    { key: 'Birthday:', value: birthday },
    { key: 'Email:', value: email },
    { key: 'Phone:', value: phone },
    { key: 'Job:', value: job },
    { key: 'Country:', value: country },
    { key: 'City:', value: city },
    { key: 'Gender', value: gender },
    { key: 'Papara Account No', value: moneyData.paparaAccountNo },
    { key: 'Monet', value: moneyData.current },
    { key: 'Waiting Verification', value: isWaitingVerification },
  ];

  const instagramInfo: InfoType[] = [
    { key: 'Username:', value: instagramData.username },
    { key: 'Full Name:', value: instagramData.full_name },
    { key: 'Biography:', value: instagramData.biography },
    { key: 'Followers:', value: instagramData.followers },
    { key: 'Following:', value: instagramData.following },
    { key: 'Post Number:', value: instagramData.post_number },
    { key: 'Average Like:', value: instagramData.average_like },
    { key: 'Keywords:', value: instagramData.keywords.join(' ') },
  ];

  const tiktokInfo: InfoType[] = [
    { key: 'Username:', value: tiktokData.username },
    { key: 'Nickname:', value: tiktokData.tiktok_nickname },
    { key: 'Followers:', value: tiktokData.followers },
    { key: 'Following:', value: tiktokData.following },
    { key: 'Hearts:', value: tiktokData.hearts },
    { key: 'Average Like:', value: tiktokData.tiktok_average_likes },
    { key: 'Engagement Rate:', value: tiktokData.tiktok_engagement_rate },
    { key: 'Verified:', value: tiktokData.verified },
    { key: 'Private Account:', value: tiktokData.privateAccount },
    { key: 'Keywords:', value: tiktokData.keywords.join(' ') },
  ];

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
            {personalInfo.map((info: InfoType) => (
              <tr>
                <td>{info.key}</td>
                <td>{info.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="profile-section bg-white p-3  shadow-md mb-3">
        <h3 className="section-title text-lg font-semibold mb-3">Instagram Data</h3>
        <table className="table-responsive">
          <tbody>
            {instagramInfo.map((info: InfoType) => (
              <tr>
                <td>{info.key}</td>
                <td>{info.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="profile-section bg-white p-3 shadow-md mb-3">
        <h3 className="section-title text-lg font-semibold mb-3">Tiktok Data</h3>
        <table className="table-responsive">
          <tbody>
            {tiktokInfo.map((info: InfoType) => (
              <tr>
                <td>{info.key}</td>
                <td>{info.value}</td>
              </tr>
            ))}
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

export default UserProfile;
