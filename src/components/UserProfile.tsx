import React, { useEffect, useState } from 'react';
import { InstagramData, TiktokData, ProfileData, MoneyData, SharedPostData, InfoType } from '../types/profileData';
import TiktokProfilePicture from './TiktokProfilePicture';
import InstagramProfilePicture from './InstagramProfilePicture';
import ReadMore from './ReadMore';
import './styles/styles.css';
import { TAchangePhone, TArecoverAccount } from '../services/userAPI';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/store/userSlice';

const UserProfile = (data: ProfileData) => {
  const token = useSelector(selectToken);

  const [_id, setId] = useState('');
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
  const [job, setJob] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [isWaitingVerification, setIsWaitingVerification] = useState(false);
  const [deleted, setDeleted] = useState('');
  const [notification, setNotification] = useState('');
  const [editor, setEditor] = useState(false);

  useEffect(() => {
    setId(data?._id ?? '');
    setBirthday(data?.birthday ?? '');
    setName(data?.name ?? '');
    setEmail(data?.email ?? '');
    setPhone(data?.phone ?? '');
    setDeleted(data?.deleted ?? '');
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
    { key: '_ID:', value: _id },
    { key: 'Name:', value: name },
    { key: 'Birthday:', value: birthday },
    { key: 'Email:', value: email },
    { key: 'Job:', value: job },
    { key: 'Country:', value: country },
    { key: 'City:', value: city },
    { key: 'Gender:', value: gender },
    { key: 'Papara Account No:', value: moneyData.paparaAccountNo },
    { key: 'Money:', value: moneyData.current },
    { key: 'Waiting Verification:', value: isWaitingVerification },
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
    { key: 'Average Like:', value: tiktokData.tiktok_average_like },
    { key: 'Engagement Rate:', value: tiktokData.tiktok_engagement_rate },
    { key: 'Verified:', value: tiktokData.verified },
    { key: 'Private Account:', value: tiktokData.privateAccount },
    { key: 'Keywords:', value: tiktokData.keywords.join(' ') },
  ];

  const recoverAccount = (id: any, status: any, token: any) => {
    TArecoverAccount(id, status, token);
    setNotification('Account Recovered (refresh page)');
  };

  const changePhone = (id: any, phone: any, token: any) => {
    TAchangePhone(id, phone, token);
    setNotification('Phone Number Changed (refresh page)');
  };

  useEffect(() => {
    if (notification) {
      const notificationTimeout = setTimeout(() => {
        setNotification('');
      }, 5000);

      return () => clearTimeout(notificationTimeout);
    }
  }, [notification]);

  const handleChangePhone = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Sadece rakamları al
    setPhone(`+${value}`);
  };

  return (
    <>
      <div className="profile-container p-14 rounded-lg  w-2/3">
        <div className="flex items-center mb-20">
          <div className="flex flex-row items-center mr-16">
            <InstagramProfilePicture instagramData={instagramData} />
            <TiktokProfilePicture tiktokData={tiktokData} />
          </div>
        </div>
      </div>
      <div className="profile-section bg-white p-3 shadow-md mb-3">
        {notification && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3">
            <span className="flex items-center block sm:inline">{notification}</span>
          </div>
        )}
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
          <tbody>
            <tr>
              <td>Phone:</td>
              <td>{phone}</td>
              <button className="text-indigo-600 hover:text-indigo-900 pt-1 pb-1" onClick={() => setEditor(!editor)}>
                Edit Phone Number
              </button>
              {editor && (
                <div className="flex flex-col space-y-2 pb-2">
                  <div className="flex flex-row space-x-1">
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(ex: 905555555555)"
                      value={phone}
                      className="form-input text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-60 pt-1 pb-1"
                      onChange={handleChangePhone}
                    />
                    <button
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                      onClick={() => changePhone(_id, phone, token)}
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </tr>
            <tr>
              <td>Deleted:</td>
              <td>{deleted}</td>
              {deleted === 'true' && (
                <button
                  className="text-indigo-600 hover:text-indigo-900 pt-3"
                  onClick={() => recoverAccount(_id, false, token)}
                >
                  Recover Account
                </button>
              )}
            </tr>
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
