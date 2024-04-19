
import { AnyIfEmpty, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindBrand, TAfindBrandName } from '../services/brandAPI';
import { TAfindCampaignById } from '../services/campaignsAPI';
import { TAfindApplicationByCampaignId, TAnewApplicationPricing } from '../services/applicationAPI';
import { BrandType, MoneyExchanges } from '../types/brandData';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import BrandProfile from '../components/BrandProfile';
import { selectToken } from '../redux/store/userSlice';
import { useParams } from 'react-router-dom';
import { CampaignType, InfoType, Limitations, ApplicationCounts } from '../types/campaignsData';
import { CampaignProfile } from '../components/CampaignProfile';
import { AddApplicationModal } from '../components/AddApplicationModal';
import { set } from 'lodash';

const applicationStates = [
  'first_application', 'account_rejected', 'waiting_address', 'address_to_approve', 'address_rejected',
  'waiting_content', 'content_offered', 'content_to_share', 'content_rejected',
  'content_approved', 'brand_canceled', 'user_canceled', 'content_shared', 'application_done',
];


const DetailedApplicationsTable = ({ application_data, token }: { application_data: any, token: string },) => {
  const [showAllKeywords, setShowAllKeywords] = useState<any>({});
  const [showAllHobbies, setShowAllHobbies] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPricingBrand, setNewPricingBrand] = useState<number>(0);
  const [newPricingUser, setNewPricingUser] = useState<number>(0);
  const [application, setApplication] = useState<any>({});

  const handleOpenPricingModal = (application: any) => {
    console.log('application : ', application)
    setApplication(application);
    setNewPricingBrand(application.price_brand);
    setNewPricingUser(application.price_user);
    setIsModalOpen(true);
  };

  useEffect(() => {
  }, [application]);

  const handleClosePricingModal = () => {
    setIsModalOpen(false);
    setApplication({});
  };

  const handleSavePricingData = (app: any) => {
    const response = TAnewApplicationPricing({ price_brand: newPricingBrand, price_user: newPricingUser }, app._id, token);
    setIsModalOpen(false);
  };
  // Toggle visibility function
  const toggleKeywordsVisibility = (index: any) => {
    setShowAllKeywords((prevShowAllKeywords: any) => ({
      ...prevShowAllKeywords,
      [index]: !prevShowAllKeywords[index],
    }));
  };
  // Toggle visibility function
  const toggleHobbiesVisibility = (index: any) => {
    setShowAllKeywords((prevShowAllKeywords: any) => ({
      ...prevShowAllKeywords,
      [index]: !prevShowAllKeywords[index],
    }));
  }



  return (

    <div className="overflow-x-auto mt-6">

      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Pricing User/Brand</th>
            <th className="border px-4 py-2">Followers</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Engagement Rate</th>
            <th className="border px-4 py-2">Application Date</th>
            {/* <th className="border px-4 py-2">State History</th>
            <th className="border px-4 py-2">Shared Posts</th> */}
            <th className="border px-4 py-2">Birthday</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Job</th>
            <th className="border px-4 py-2">Score</th>
            <th className="border px-4 py-2">School Type</th>
            {/* <th className="border px-4 py-2">School Name</th> */}
            <th className="border px-4 py-2">City</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">Language</th>
            <th className="border px-4 py-2">Currency</th>
            <th className="border px-4 py-2">Hobbies</th>
            <th className="border px-4 py-2">Keywords</th>
            <th className="border px-4 py-2">Verification</th>
            {/* Add more headers for additional data points if needed */}
          </tr>
        </thead>
        <tbody>
          {application_data.map((app: any, index: any) => (
            <tr className="border-t">
              <td className="border px-4 py-2">{app.insta_username}</td>
              <td className="border px-4 py-2">{app.price_user}/{app.price_brand}
                <button 
                className='text-indigo-600 bg-indigo-100 rounded px-2 py-1  text-xs'
                onClick={() => handleOpenPricingModal(app)}>Edit</button>
              </td>
              {isModalOpen ?
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg  overflow-y-auto h-5/6 max-w-md w-full space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Pricing Settings</h2>
                    <form onSubmit={handleClosePricingModal} className="space-y-4 flex-col">
                      <label htmlFor="newPricingBrand">New Pricing User</label>
                      <input
                        type="text"
                        value={newPricingUser}
                        onChange={(e) => setNewPricingUser(parseInt(e.target.value))}
                        placeholder="Enter new pricing user"
                        className="block w-full p-2 border rounded"
                      />
                      <label htmlFor="newPricingBrand">New Pricing Brand</label>
                      <input
                        type="text"
                        value={newPricingBrand}
                        onChange={(e) => setNewPricingBrand(parseInt(e.target.value))}
                        placeholder="Enter new pricing brand"
                        className="block w-full p-2 border rounded"
                      />
                      <button className='bg-indigo-100 px-4 py-2 rounded mr-4 ' onClick={() => handleSavePricingData(application)}>Save</button>
                      <button className='bg-indigo-100 px-4 py-2 rounded mr-4 ' onClick={handleClosePricingModal}>Cancel</button>
                    </form>
                  </div>

                </div> : null}
              <td className="border px-4 py-2">{app.insta_followers}</td>
              <td className="border px-4 py-2">{app.state}</td>
              <td className="border px-4 py-2">{`${app.insta_engagement_rate}%`}</td>
              <td className="border px-4 py-2">{new Date(app.application_date).toLocaleDateString()}</td>
              {/* <td className="border px-4 py-2">
                {app.state_history.map((history: any, hIndex: any) => (
                  <div key={hIndex}>{`${history.state}: ${new Date(history.date).toLocaleDateString()}`}</div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {app.insta_shared_posts.map((post: any, pIndex: any) => (
                  <div key={pIndex}>{`${post.media_url} - Likes: ${post.like_count}, Comments: ${post.comment_count}`}</div>
                ))}
              </td> */}
              <td className="border px-4 py-2">{new Date(app.birthday).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{app.age}</td>
              <td className="border px-4 py-2">{app.gender}</td>
              <td className="border px-4 py-2">{app.job}</td>
              <td className="border px-4 py-2">{app.score}</td>
              <td className="border px-4 py-2">{app.school_type}</td>
              {/* <td className="border px-4 py-2 text-xs">{app.school_name}</td> */}
              <td className="border px-4 py-2">{app.city}</td>
              <td className="border px-4 py-2">{app.country}</td>
              <td className="border px-4 py-2">{app.language}</td>
              <td className="border px-4 py-2">{app.currency}</td>
              <td className="border px-4 py-2 text-xs">
                {showAllHobbies[index]
                  ? app.hobbies.join(', ')
                  : ''}
                {app.hobbies.length > 0 && (
                  <button
                    onClick={() => toggleHobbiesVisibility(index)}
                    className="ml-2 text-blue-500 hover:text-blue-800"
                  >
                    {showAllHobbies[index] ? 'Show Less' : 'Show All'}
                  </button>
                )}
              </td>
              <td className="border px-4 py-2 text-xs">
                {showAllKeywords[index]
                  ? app.insta_keywords.join(', ')
                  : ''}
                {app.insta_keywords.length > 0 && (
                  <button
                    onClick={() => toggleKeywordsVisibility(index)}
                    className="ml-2 text-blue-500 hover:text-blue-800"
                  >
                    {showAllKeywords[index] ? 'Show Less' : 'Show All'}
                  </button>
                )}
              </td>
              <td className="border px-4 py-2">{app.verification ? 'Yes' : 'No'}</td>
              {/* Render more data fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




const FindCampaign = () => {
  const { _id } = useParams<{ _id: string }>();
  const token = useSelector(selectToken);
  const [selectedState, setSelectedState] = useState('first_application');
  const [error, setError] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<CampaignType>();
  const [applications, setApplications] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (_id) {
      console.log('campaign id : ', _id)
      const fetchData = async () => {
        try {
          const campaign_data = await TAfindCampaignById(_id, token);
          const application_data = await TAfindApplicationByCampaignId(_id, token, selectedState);
          setCampaign(campaign_data);
          setApplications(application_data.applications);
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [_id, token, selectedState]);



  const handleChange = (e: any) => {
    setSelectedState(e.target.value);
  };

  const handleForm = async (e: any) => {
    e.preventDefault();

  };


  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row justify-between items-start min-h-screen bg-cover bg-center relative">
        <div className="w-full ">
          loading
        </div>

      </div>)
  }
  else
    return (
      <div className="flex flex-col lg:flex-col justify-between items-start min-h-screen bg-cover bg-center relative">
        <div className="w-full ">
          {campaign && <CampaignProfile {...campaign} />}
        </div>
        <div className="w-full ">
          <button className='bg-indigo-100 px-8 py-4 rounded-md my-4' onClick={handleOpenModal}>Add New Application</button>
          <AddApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} _id={_id} token={token} currency={campaign ? campaign.currency : "TRY"} />
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedState}
            onChange={handleChange}
          >
            <option value="">Select Application State</option>
            {applicationStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <DetailedApplicationsTable application_data={applications} token={token} />
        </div>

        <form className="w-1/4 absolute top-5 right-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex justify-center">
            <div className="relative inline-flex">

            </div>

          </div>
        </form>
      </div>
    );
};

export default FindCampaign;
