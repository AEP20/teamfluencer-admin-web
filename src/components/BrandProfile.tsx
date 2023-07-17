import React, { useEffect, useState } from 'react';
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
  const [jobTitle, setJobTitle] = useState('');
  const [moneyExchanges, setMoneyExchanges] = useState<MoneyExchanges[]>([]);

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    type: '',
    firm_name: '',
    contactName: '',
    id: '',
    city: '',
    country: '',
    address: '',
    zipCode: '',
  });

  useEffect(() => {
    setEmail(data?.email ?? '');
    setPhone(data?.phone ?? '');
    setCountry(data?.country ?? '');
    setFirstName(data?.first_name ?? '');
    setLastName(data?.last_name ?? '');
    setCurrency(data?.currency ?? '');
    setLanguage(data?.language ?? '');
    setJobTitle(data?.job_title ?? '');
    setBrandName(data?.brand_name ?? '');
    setBalance(data?.balance ?? 0);
    setBillingAddress(
      data?.billing_address ?? {
        type: '',
        firm_name: '',
        contact_name: '',
        id: '',
        city: '',
        country: '',
        address: '',
        zip_code: '',
      },
    );
    setMoneyExchanges(
      data?.money_exchanges ?? {
        operation: '',
        amount: 0,
        application_id: '',
        action_time: '',
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
      <div className="profile-section bg-white p-3 shadow-md mb-3 w-full">
        <h3 className="section-title text-lg font-semibold mb-3">Brand Information</h3>
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

        <h3 className="section-title text-lg font-semibold mb-3 mt-5">Billing Information</h3>
        <tr className="flex">
          <td className="flex w-full flex-col ml-3 info-value">
            <tr>Type : {billingAddress.type}</tr>
            <div className="border-t border-gray-200 my-2" />
            <tr>Firm Name : {billingAddress.firm_name}</tr>
            <div className="border-t border-gray-200 my-2" />
            <tr>Contact Name : {billingAddress.contactName}</tr>
            <div className="border-t border-gray-200 my-2" />
            <tr>ID : {billingAddress.id}</tr>
            <div className="border-t border-gray-200 my-2" />
            <tr>City : {billingAddress.city}</tr>
            <div className="border-t border-gray-200 my-2" />
            <tr>Country : {billingAddress.country}</tr>
            <div className="border-t border-gray-200 my-2" />
            <tr>Address : {billingAddress.address}</tr>
            <div className="border-t border-gray-200 my-2" />
            <tr>Zip Code : {billingAddress.zipCode}</tr>
          </td>
        </tr>

        {moneyExchanges.length > 0 && (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs text-gray-500">Operation</th>
                <th className="px-4 py-2 text-xs text-gray-500">Amount</th>
                <th className="px-4 py-2 text-xs text-gray-500">Application ID</th>
                <th className="px-4 py-2 text-xs text-gray-500">Action Time</th>
              </tr>
            </thead>
            <tbody>
              {moneyExchanges.map((exchange: MoneyExchanges, index: number) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-2 text-sm">{exchange.operation}</td>
                  <td className="px-4 py-2 text-sm">{exchange.amount}</td>
                  <td className="px-4 py-2 text-sm">{exchange.application_id}</td>
                  <td className="px-4 py-2 text-sm">{new Date(exchange.action_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default BrandProfile;
