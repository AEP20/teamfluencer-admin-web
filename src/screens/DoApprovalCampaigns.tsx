import { useEffect, useState } from 'react';
import React from 'react';
import { TAfindApprovalCampaign, TAverifyCampaign } from '../services/campaigns';
import ReadMore from '../components/ReadMore';
import { Campaign, Limitations, Statistic, Details, ApplicationCounts } from '../types/campaignsData';
import { selectToken } from '../redux/store/userSlice';
import { useSelector } from 'react-redux';

const DoApprovalCampaigns: React.FC = () => {
  const token = useSelector(selectToken);
  const [data, setData] = useState<Campaign[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TAfindApprovalCampaign(token);
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (err: any) {
        setError(err.message || 'Bir hata oluştu');
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refreshData]);

  const handleApprove = async (id: any, isVerified: boolean) => {
    //   setIsLoading(true);
    //   const response = await TAverifyUser(id, isVerified);
    //   if (!response) {
    //     return;
    //   }
    //   setRefreshData((prev) => !prev);
    //   setIsLoading(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm">
        <div className="flex flex-row justify-between">
          <div>
            <button
              onClick={() => handleApprove(data[currentIndex].id, false)}
              className="mt-2 mr-2 py-2 px-6 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Red
            </button>
            <button
              onClick={() => handleApprove(data[currentIndex].id, true)}
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
        <h2 className="text-2xl font-semibold mb-4">{data[currentIndex].name}</h2>
        <img
          className="w-full h-64 object-cover mb-4 rounded-md"
          src={data[currentIndex].cover_photo}
          alt={data[currentIndex].name}
        />
        <h3 className="font-semibold text-lg mb-2">Brand:</h3>
        <h3 className="font-semibold text-lg mb-2">Description:</h3>
        <p className="mb-4">{data[currentIndex].description}</p>
      </div>

      <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <h3 className="font-semibold text-lg mb-2">Link:</h3>
        <p className="mb-4">{data[currentIndex].details.link}</p>
        <h3 className="font-semibold text-lg mb-2">Photos:</h3>
        {data[currentIndex].details.photo.map((photo, index) => (
          <img key={index} className="w-full h-64 object-cover my-2 rounded-md" src={photo} alt={`Detail ${index}`} />
        ))}
      </div>

      <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
        <h3 className="font-semibold text-lg mb-2">Gender:</h3>
        <p className="mb-4">{data[currentIndex].limitations.gender || 'None'}</p>
        <h3 className="font-semibold text-lg mb-2">Minimum Followers:</h3>
        <p className="mb-4">{data[currentIndex].limitations.min_follower || 'None'}</p>
      </div>

      {data[currentIndex].statistics.length > 0 && (
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          {data[currentIndex].statistics.map((statistic, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{statistic.date}</h3>
              <p>Views: {statistic.views}</p>
              <p>Shared: {statistic.shared}</p>
              <p>Likes: {statistic.likes}</p>
              <p>Comments: {statistic.comments}</p>
              <p>Price: {statistic.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoApprovalCampaigns;
