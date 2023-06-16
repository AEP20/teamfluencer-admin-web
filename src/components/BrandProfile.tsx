import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';
import { IRootState } from '../redux/store/index';
import { toggleSidebar } from '../redux/store/themeConfigSlice';
import { TAfindUser } from '../services/userAPI';
import InstagramSharedPosts from './InstagramSharedPosts';
import TiktokProfilePicture from './TiktokProfilePicture';
import InstagramProfilePicture from './InstagramProfilePicture';
import ReadMore from './ReadMore';
import { MoneyExchanges, BillingAddress, BrandType, InfoType } from '../types/brandData';
import './styles/styles.css';

const BrandProfile = (data: BrandType) => {
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('');
  const [language, setLanguage] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    type: '',
    firm_name: '',
    id: '',
    city: '',
    country: '',
    address: '',
    zip_code: '',
  });

  useEffect(() => {
    setEmail(data?.email ?? '');
    setPhone(data?.phone ?? '');
    setCountry(data?.country ?? '');
    setFirstName(data?.first_name ?? '');
    setLastName(data?.last_name ?? '');
    setCurrency(data?.currency ?? '');
    setLanguage(data?.language ?? '');
    setBrandLogo(data?.brand_logo ?? '');
    setJobTitle(data?.job_title ?? '');
    setBrandName(data?.brand_name ?? '');
    setBalance(data?.balance ?? 0);
    setBillingAddress(
      data?.billing_address ?? {
        type: '',
        firm_name: '',
        id: '',
        city: '',
        country: '',
        address: '',
        zip_code: '',
      },
    );
  }, [data]);

  const brandInfo: InfoType[] = [
    { key: 'Brand Name:', value: brandName },
    { key: 'Email:', value: email },
    { key: 'Phone:', value: phone },
    { key: 'Country:', value: country },
    { key: 'First Name:', value: firstName },
    { key: 'Last Name:', value: lastName },
    { key: 'Currency:', value: currency },
    { key: 'Language:', value: language },
    { key: 'Job Title:', value: jobTitle },
    { key: 'Balance:', value: balance },
  ];

  return (
    <>
      <div className="profile-container p-4 rounded-lg  w-2/3">
        <div className="flex items-center mb-20">
          <div className="flex flex-row items-center mr-16">
            <img src={brandLogo} alt="brand_logo" className="rounded-full w-32 h-32 mr-3" />
          </div>
        </div>
      </div>
      <div className="profile-section bg-white p-3 shadow-md mb-3">
        <h3 className="section-title text-lg font-semibold mb-3">Personal Information</h3>
        <table className="table-responsive">
          <tbody>
            {brandInfo.map((info: InfoType) => (
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

export default BrandProfile;
