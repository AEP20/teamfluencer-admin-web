import { useEffect, useState } from 'react';
import React from 'react';
import { TAfindApprovalUser, TAverifyUser } from '../services/userAPI';
import { SharedPostData, VideosData } from '../types/profileData';
import ReadMore from '../components/ReadMore';
import { selectToken } from '../redux/store/userSlice';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  country: string;
  phone: string;
  gender: string;
  followers: number;
  profile_complete: boolean;
  post_number: string;
  average_likes: number;
  tiktok_followers: string;
  tiktok_average_like: string;
  tiktok_engagement_rate: string;
  shared_posts: SharedPostData[];
  videos: VideosData[];
}

const DoApprovalScreen: React.FC = () => {
  const token = useSelector(selectToken);
  const [data, setData] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TAfindApprovalUser(token);
        if (response && Array.isArray(response)) {
          setData(response);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, [refreshData]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data.length ? prevIndex + 1 : prevIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleApprove = async (id: string, status: string) => {
    setIsLoading(true);
    try {
      const response = await TAverifyUser(id, status, token);
      if (!response) {
        setError('Response is null');
        return;
      }
      // setRefreshData((prev) => !prev);
      setIsLoading(false);
      handleNext();
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const genderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <FontAwesomeIcon icon={faMars} style={{ color: '#0000ff' }} />;
      case 'female':
        return <FontAwesomeIcon icon={faVenus} style={{ color: '#ff00dd' }} />;
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-pink-600"></div>
      </div>
    );
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3">
        <div className="flex flex-row justify-between">
          <div>
            <button
              onClick={() => handleApprove(data[currentIndex].id, 'false')}
              className="mt-2 mr-2 py-2 px-6 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Red
            </button>
            <button
              onClick={() => handleApprove(data[currentIndex].id, 'true')}
              className="mt-2 mr-2 py-2 px-6 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Onay
            </button>
          </div>

          <div>
            <button onClick={handlePrevious} className="mt-2 mr-2 py-2 px-6 rounded-md bg-blue-500 text-white">
              Geri
            </button>
            <button onClick={handleNext} className="mt-2 mr-2 py-2 px-6 rounded-md bg-blue-500 text-white">
              İleri
            </button>
          </div>
        </div>
        {data.length > 0 && (
          <div className="datatables">
            <div className="w-full max-w-xl mt-4 rounded-md shadow-sm ">
              <table className="table-auto w-full text-sm">
                <tbody>
                  {Object.entries(data[currentIndex]).map(([key, value]) => {
                    if (key !== 'id' && key !== 'shared_posts' && key !== 'videos' && key !== 'money') {
                      return (
                        <tr key={key}>
                          <td className="font-medium pr-2 p-0">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                          <td className="text-gray-700 p-0">
                            {key === 'gender' ? genderIcon(value as string) : String(value)}
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="w-full lg:w-2/3 h-screen mt-4 lg:mt-0 p-10">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1">
          {data.length > 0 &&
            data[currentIndex].shared_posts &&
            data[currentIndex].shared_posts.map((post: SharedPostData) => (
              <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden max-w-xs mx-2 mb-2">
                <img className="h-32 w-full object-cover zoom" src={post.media_url} alt={post.description} />
                <div className="p-2">
                  {post.location && post.location.name && (
                    <div className="font-semibold text-md mb-1">{post.location.name}</div>
                  )}
                  {post.description && post.description.length > 150 ? (
                    <ReadMore content={post.description} maxCharacterCount={50} />
                  ) : (
                    <p className="text-gray-700 text-sm">{post.description}</p>
                  )}
                </div>
                <div className="p-2">
                  <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 mr-1 mb-1">
                    Likes: {post.like_count}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 mr-1 mb-1">
                    Comments: {post.comment_count}
                  </span>
                </div>
              </div>
            ))}

          {data.length > 0 &&
            data[currentIndex].videos &&
            data[currentIndex].videos.map((video: VideosData) => (
              <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden max-w-xs mx-2 mb-2">
                <img className="h-32 w-full object-cover zoom" src={video.cover} alt={video.description} />
                <div className="p-2">
                  <div className="font-semibold text-md mb-1">{video.music}</div>
                  {video.description && video.description.length > 150 ? (
                    <ReadMore content={video.description} maxCharacterCount={50} />
                  ) : (
                    <p className="text-gray-700 text-sm">{video.description}</p>
                  )}
                </div>
                <div className="p-2">
                  <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 mr-1 mb-1">
                    Likes: {video.like_count}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 mr-1 mb-1">
                    Comments: {video.comment_count}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DoApprovalScreen;
