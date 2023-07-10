import React, { useEffect, useState } from 'react';
import { CampaignType, InfoType, Limitations } from '../types/campaignsData';
import './styles/styles.css';

const CampaignProfile = (data: CampaignType) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [isVerified, setIsVerified] = useState(Boolean);
  const [rejectedReason, setRejectedReason] = useState('');
  const [limitations, setLimitations] = useState<Limitations>({
    gender: undefined,
    min_follower: undefined,
    max_follower: undefined,
    min_age: undefined,
    max_age: undefined,
    school: '',
    city: '',
  });

  useEffect(() => {
    setName(data?.name ?? '');
    setCountry(data?.country ?? '');
    setDescription(data?.description ?? '');
    setPlatform(data?.platform ?? '');
    setCoverPhoto(data?.cover_photo ?? '');
    setIsVerified(data?.is_verified ?? Boolean);
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
  }, [data]);

  const campaignInfo: InfoType[] = [
    { key: 'Campaign Name:', value: name },
    { key: 'Country:', value: country },
    { key: 'Description:', value: description },
    { key: 'Platform:', value: platform },
    { key: 'Cover Photo:', value: coverPhoto },
    { key: 'Is Verified:', value: isVerified },
    { key: 'Rejected Reason:', value: rejectedReason },
    { key: 'Limitations:', value: JSON.stringify(limitations) },
  ];

  return (
    <>
      <div className="profile-container p-4 rounded-lg  w-2/3">
        <div className="flex items-center mb-20">
          <div className="flex flex-row items-center mr-16">
            {coverPhoto ? (
              <img src={coverPhoto} alt="brand_logo" className="rounded-full w-32 h-32 mr-3" />
            ) : (
              <p className="text-3xl font-bold text-black text-center mb-24">No Image</p>
            )}
          </div>
        </div>
      </div>
      <div className="profile-section bg-white p-3 shadow-md mb-3">
        <h3 className="section-title text-lg font-semibold mb-3">Campaign Information</h3>
        <table className="table-responsive">
          <tbody>
            {campaignInfo.map((info: InfoType) => (
              <tr>
                <td>{info.key}</td>
                <td>{info.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CampaignProfile;
