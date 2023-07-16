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
  const [brandLogo, setBrandLogo] = useState('');
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
    setBrandLogo(data?.brand_logo ?? '');
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

  const brandMoneyExchanges: InfoType[] = [
    { key: 'type', value: billingAddress.type },
    { key: 'firm_name', value: billingAddress.firm_name },
    { key: 'contact_name', value: billingAddress.contactName },
    { key: 'id', value: billingAddress.id },
    { key: 'city', value: billingAddress.city },
    { key: 'country', value: billingAddress.country },
    { key: 'address', value: billingAddress.address },
    { key: 'zip_code', value: billingAddress.zipCode },
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

        {brandMoneyExchanges.length > 0 && (
          <>
            <h3 className="section-title text-lg font-semibold mb-3 mt-5">Billing Information</h3>
            <table className="table-auto w-full">
              <tbody>
                {brandMoneyExchanges.map((info: InfoType, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2 text-sm text-gray-600">{info.key}</td>
                    <td className="px-4 py-2 text-sm">{info.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

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
