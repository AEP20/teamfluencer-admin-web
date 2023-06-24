import { useEffect, useState } from 'react';
import React from 'react';
import { TAfindApprovalCampaign, TAdoApprovalCampaign } from '../services/campaigns';
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
  const [rejectedReason, setRejectedReason] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TAfindApprovalCampaign(token);
        if (response.data && Array.isArray(response.data)) {
          console.log('neyi', response.data);
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
  console.log('token', token);

  const handleApprove = async (status: string, rejected_reason: string, id: string, token: string) => {
    setIsLoading(true);
    console.log('status', status, 'rejectReason', rejected_reason, 'id', id, 'anasısikik', token);
    const response = await TAdoApprovalCampaign(status, rejected_reason, id, token);
    if (!response) {
      return;
    }
    setRefreshData((prev) => !prev);
    setIsLoading(false);
    setRejectedReason('');
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (data.length === 0) return <p>Onay bekleyen kampanya bulunamadı</p>;

  return (
    <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-1/2 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full text-sm">
          <div className="flex flex-row justify-between">
            <div>
              {/* const response = await TAdoApprovalCampaign(status, rejectReason, id, token); */}

              <button
                onClick={() => handleApprove('denied', rejectedReason, data[currentIndex]._id, token)}
                className="mt-2 mr-2 py-2 px-6 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Red
              </button>
              <button
                onClick={() => handleApprove('verified', rejectedReason, data[currentIndex]._id, token)}
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
          <div className="w-full px-2 mt-4 mb-2">
            <input
              type="text"
              className="w-full p-2 rounded-md border-2 border-gray-300"
              placeholder="reject reason"
              value={rejectedReason}
              onChange={(event) => setRejectedReason(event.target.value)}
            />
          </div>

          <tbody>
            <tr>
              <td>
                <h2 className="text-2xl font-semibold mb-4 text-center">{data[currentIndex]?.name || 'None'}</h2>
                <img
                  className="w-full h-64 object-cover mb-4 rounded-md zoom"
                  src={data[currentIndex].cover_photo}
                  alt={data[currentIndex].name}
                />
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2} className="text-lg font-semibold mb-4 text-center bg-white">
                        Limitations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold text-md mb-2">Gender:</td>
                      <td>{data[currentIndex]?.limitations?.gender || 'None'}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-md mb-2">Followers:</td>
                      <td>
                        {data[currentIndex]?.limitations?.min_follower || 'None'} -{' '}
                        {data[currentIndex]?.limitations?.max_follower || 'None'}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-md mb-2">Max Age:</td>
                      <td>{data[currentIndex]?.limitations?.max_age || 'None'}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-md mb-2">City:</td>
                      <td>{data[currentIndex]?.limitations?.city || 'None'}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table-auto min-w-min max-w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="font-semibold">Application Counts:</td>
                      <td></td>
                    </tr>
                    {Object.entries(data[currentIndex]?.application_counts || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td className="min-w-min">{key.replace(/_/g, ' ') + ':'}</td>
                        <td className="min-w-min">{value || '0'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-1/2 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th colSpan={2} className="text-lg font-semibold mb-4 text-center bg-white">
                Details
              </th>
            </tr>
          </thead>
          {/* <h3 className="font-semibold text-md mb-2">Link:</h3>
        <p className="mb-4">{data[currentIndex].details.link}</p> */}
          {/* <h3 className="font-semibold text-md mb-2">Photos:</h3>
        {data[currentIndex].details.photo.map((photo, index) => (
          <img key={index} className="w-full h-64 object-cover my-2 rounded-md" src={photo} alt={`Detail ${index}`} />
        ))} */}

          <tbody>
            <tr>
              <td className="font-semibold text-md mb-2">Brand Description:</td>
              <td>{data[currentIndex].brand_description || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Campaign Dates:</td>
              <td>
                {new Date(data[currentIndex].campaign_start).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                })}{' '}
                -
                {new Date(data[currentIndex].campaign_end).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                })}
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Barter:</td>
              <td>{data[currentIndex].barter ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Details:</td>
              <td>{data[currentIndex].content_details || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Expectations:</td>
              <td>{data[currentIndex].content_expectations || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Mentions:</td>
              <td>{data[currentIndex].content_mentions || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Example Text:</td>
              <td>{data[currentIndex].content_example_text || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Hashtags:</td>
              <td>
                {data[currentIndex].content_hashtags.split(',').map((hashtag, index) => (
                  <span key={index}>
                    {hashtag.trim() + (index !== data[currentIndex].content_hashtags.split(',').length - 1 ? ', ' : '')}
                  </span>
                ))}
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Metrics:</td>
              <td>{data[currentIndex].content_metrics || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Offered:</td>
              <td>{data[currentIndex].content_offered || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Content Target Audience:</td>
              <td>{data[currentIndex].content_target_audience || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Estimated Budget:</td>
              <td>{`${data[currentIndex].estimated_budget} ${data[currentIndex].currency}`}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Max Cost:</td>
              <td>{`${data[currentIndex].max_cost} ${data[currentIndex].currency}`}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Platform:</td>
              <td>{data[currentIndex].platform || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Waiting Verification:</td>
              <td>{data[currentIndex].verification || 'None'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-md mb-2">Field of Activity:</td>
              <td>{data[currentIndex].field_of_activity || 'None'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {data[currentIndex].statistics.length > 0 && (
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-md shadow-sm">
          <table className="table-auto w-full text-sm">
            <tbody>
              <tr>
                <td>
                  <h3 className="text-2xl font-semibold mb-4">Statistics</h3>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoApprovalCampaigns;
