import React, { useEffect, useState } from 'react';
import { CampaignType, InfoType, Limitations, ApplicationCounts } from '../types/campaignsData';
import './styles/styles.css';
import { TAupdateCampaignNotes } from '../services/campaignsAPI';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/store/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export const CampaignProfile = (data: CampaignType) => {
  const token = useSelector(selectToken);

  const [_id, set_Id] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [platform, setPlatform] = useState('');
  const [campaignNotes, setCampaignNotes] = useState(['']);
  const [notes, setNotes] = useState('');
  const [isVerified, setIsVerified] = useState(Boolean);
  const [visibility, setVisibility] = useState(Boolean);
  const [rejectedReason, setRejectedReason] = useState('');
  const [limitations, setLimitations] = useState<Limitations>({
    gender: 'male',
    min_follower: 0,
    max_follower: 0,
    min_age: 0,
    max_age: 0,
    school: '',
    city: '',
  });
  const [applicationCounts, setApplicationCounts] = useState<ApplicationCounts>({
    first_application: 0,
    waiting_content: 0,
    content_offered: 0,
    content_to_share: 0,
    content_rejected: 0,
    content_shared: 0,
    content_approved: 0,
    account_rejected: 0,
    brand_canceled: 0,
    user_canceled: 0,
    application_done: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [logo_url, setLogo_url] = useState('');

  useEffect(() => {
    set_Id(data?._id ?? '');
    setName(data?.name ?? '');
    setCountry(data?.country ?? '');
    setDescription(data?.description ?? '');
    setCoverPhoto(data?.cover_photo ?? '');
    setPlatform(data?.platform ?? '');
    setCampaignNotes(data?.notes ?? ['']);
    setIsVerified(data?.is_verified ?? Boolean);
    setVisibility(data?.visibility ?? Boolean);
    setRejectedReason(data?.rejected_reason ?? '');
    setLimitations(
      data?.limitations ?? {
        gender: 'male' || 'female',
        min_age: 0,
        max_age: 0,
        min_follower: 0,
        max_follower: 0,
        school: '',
        city: '',
      },
    );
    setApplicationCounts(
      data?.application_counts ?? {
        first_application: 0,
        waiting_content: 0,
        content_offered: 0,
        content_to_share: 0,
        content_rejected: 0,
        content_shared: 0,
        content_approved: 0,
        account_rejected: 0,
        brand_canceled: 0,
        user_canceled: 0,
        application_done: 0,
      },
    );
  }, [data]);

  const campaignInfo: InfoType[] = [
    { key: 'Campaign Id:', value: _id },
    { key: 'Campaign Name:', value: name },
    { key: 'Country:', value: country },
    { key: 'Description:', value: description },
    { key: 'Platform:', value: platform },
    { key: 'Visibility:', value: visibility === true ? 'true' : 'false' },
    { key: 'Is Verified:', value: isVerified === true ? 'true' : 'false' },
    { key: 'Rejected Reason:', value: rejectedReason === '' ? 'No rejected Reason' : rejectedReason },
  ];


  const handleUpdateNote = async (campaignNotes: any) => {
    try {
      const brand = await TAupdateCampaignNotes(_id, campaignNotes, token);
      if (brand) alert('Note updated successfully');
          } catch (error) {
      console.error(error);
    }
  };


  const handleUploadPhoto = async (logo_url: any) => {
    try {
      TAupdateCampaign(_id, { cover_photo: logo_url }, token);
      setIsOpen(false);

    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteNote = (index: any) => {
    const newNotes = campaignNotes.filter((note, noteIndex) => noteIndex !== index);
    handleUpdateNote(newNotes);
  };

  return (
    <div className="bg-gradient-to-rt from-teal-50 to-blue-50 p-6 rounded-lg shadow-lg max-w-6xl mx-auto mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Campaign Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          {coverPhoto && (
            <div className="flex items-center">
              <img src={coverPhoto} alt="Brand Logo" className="w-28 h-28 rounded-full mr-4" />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(true)}
              >
                Change Picture
              </button>
            </div>
          )}
          {!coverPhoto && (
            <div
              className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Add Picture
            </div>
          )}
          {isOpen && (
            <div>
              <input
                type="text"
                placeholder="Enter photo url"
                value={logo_url}
                onChange={(e) => setLogo_url(e.target.value)}
                className="border border-gray-400 rounded py-2 px-4 mb-2"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleUploadPhoto(logo_url)}
              >
                Save
              </button>
            </div>
          )}
          <table className="table-auto w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-700">Campaign Id</td>
                <td className="py-2 text-gray-600">{data._id}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-700">Country</td>
                <td className="py-2 text-gray-600">{data.country}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-700">Platform</td>
                <td className="py-2 text-gray-600">{data.platform}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-700">Visibility</td>
                <td className="py-2 text-gray-600">{data.visibility ? 'Visible' : 'Hidden'}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-700">Is Verified</td>
                <td className="py-2 text-gray-600">{data.is_verified ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <DetailItem label="Description" value={data.description} />

        {/* Limitations */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Limitations</h4>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <table className="table-auto w-6/12">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Gender</td>
                  <td className="py-2">{data.limitations.gender ? data.limitations.gender : 'Any'}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Age</td>
                  <td className="py-2">
                    {data.limitations.min_age} to {data.limitations.max_age}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Followers</td>
                  <td className="py-2">
                    {data.limitations.min_follower} to {data.limitations.max_follower}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">School</td>
                  <td className="py-2">{data.limitations.school || 'Any'}</td>
                </tr>
                <tr>
                  <td className="py-2">City</td>
                  <td className="py-2">{data.limitations.city || 'Any'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Campaign Notes */}
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Notes</h4>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <ul>
              {campaignNotes.map((note, index) => (
                <li key={index} className="text-gray-600 mt-2">
                  {note}
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: '#005eff', marginLeft: '8px' }}
                    onClick={() => handleDeleteNote(index)}
                  />
                </li>
              ))}
            </ul>
            <textarea
              className="w-full mt-4 p-2 border border-gray-200 rounded-md"
              placeholder="Add a note"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex gap-12 mt-2">
              <button
                className="bg-blue-500 text-white rounded-md px-3 py-2 w-full"
                onClick={() => handleUpdateNote([...campaignNotes, notes])}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
        {/* Application Counts */}
        <div className="col-span-1 md:col-span-1 mb-5">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Application Counts</h4>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <table className="table-auto  w-6/12">
              <tbody>
                {Object.entries(data.application_counts).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-2">
                      {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}
                    </td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DetailItem label="Rejected Reason" value={data.rejected_reason || '-'} />
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
    <h5 className="text-md font-semibold mb-1 text-gray-700">{label}</h5>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default CampaignProfile;
