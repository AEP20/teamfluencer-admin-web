import React, { useEffect, useState } from 'react';
import { CampaignType, InfoType, Limitations, ApplicationCounts } from '../types/campaignsData';
import './styles/styles.css';

const CampaignProfile = (data: CampaignType) => {
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
    <div className="profile-section bg-white p-3 shadow-md mb-3">
      <h3 className="section-title text-lg font-semibold mb-3">Campaign Information</h3>
      <table className="table-responsive">
        <tbody>
          {campaignInfo.map((info: InfoType) => (
            <tr key={info.key}>
              <td className="info-key">{info.key}</td>
              <td className="info-value">{info.value}</td>
            </tr>
          ))}
          <tr>
            <td className="info-key">Limitations:</td>
            <td className="info-value">
              <div>Gender : {limitations.gender}</div>
              <div>Min Age : {limitations.min_age}</div>
              <div>Max Age : {limitations.max_age}</div>
              <div>Min Follower : {limitations.min_follower}</div>
              <div>Max Follower : {limitations.max_follower}</div>
              <div>School : {limitations.school}</div>
              <div>City : {limitations.city}</div>
            </td>
          </tr>
          <tr>
            <td className="info-key">Application Counts:</td>
            <td className="info-value">
              <div>First Application : {applicationCounts.first_application}</div>
              <div>Waiting Content : {applicationCounts.waiting_content}</div>
              <div>Content Offered : {applicationCounts.content_offered}</div>
              <div>Content To Share : {applicationCounts.content_to_share}</div>
              <div>Content Rejected : {applicationCounts.content_rejected}</div>
              <div>Content Shared : {applicationCounts.content_shared}</div>
              <div>Content Approved : {applicationCounts.content_approved}</div>
              <div>Account Rejected : {applicationCounts.account_rejected}</div>
              <div>Brand: Canceled : {applicationCounts.brand_canceled}</div>
              <div>User Canceled : {applicationCounts.user_canceled}</div>
              <div>Application Done : {applicationCounts.application_done}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CampaignProfile;
