import React, { useEffect, useState } from 'react';
import { CampaignType, InfoType, Limitations, ApplicationCounts } from '../types/campaignsData';
import './styles/styles.css';

export const CampaignProfile = (data: CampaignType) => {
  const [_id, set_Id] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
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

  useEffect(() => {
    set_Id(data?._id ?? '');
    setName(data?.name ?? '');
    setCountry(data?.country ?? '');
    setDescription(data?.description ?? '');
    setPlatform(data?.platform ?? '');
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

  return (
    <div className="bg-gradient-to-rt from-teal-50 to-blue-50 p-6 rounded-lg shadow-lg max-w-6xl mx-auto mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Campaign Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <table className="table-auto w-full">
            <tbody>
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
                  <td className="py-2">{data.limitations.gender ? data.limitations.gender : "Any"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Age</td>
                  <td className="py-2">{data.limitations.min_age} to {data.limitations.max_age}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Followers</td>
                  <td className="py-2">{data.limitations.min_follower} to {data.limitations.max_follower}</td>
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


        {/* Application Counts */}
        <div className="col-span-1 md:col-span-1 mb-5">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Application Counts</h4>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <table className="table-auto  w-6/12">
              <tbody>
                {Object.entries(data.application_counts).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-2">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}</td>
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

const DetailItem: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
    <h5 className="text-md font-semibold mb-1 text-gray-700">{label}</h5>
    <p className="text-gray-600">{value}</p>
  </div>
);


export default CampaignProfile;
