import React, { useEffect, useState } from 'react';
import { MoneyExchanges, BillingAddress, BrandType, InfoType } from '../types/brandData';
import './styles/styles.css';
import { selectToken } from '../redux/store/userSlice';
import { useSelector } from 'react-redux';
import { TAaddBrandNote, TAdeleteNote, TAupdateBrandNote } from '../services/brandAPI';

const BrandProfile = (data: BrandType) => {
  const token = useSelector(selectToken);

  const [_id, setId] = useState('');
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
  const [notes, setNotes] = useState('');
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
    setId(data?._id ?? '');
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
    setNotes(data?.notes ?? '');
  }, [data]);

  const brandInfo: InfoType[] = [
    { key: 'Brand Name', value: brandName },
    { key: 'Email', value: email },
    { key: 'Phone', value: phone },
    { key: 'Country', value: country },
    { key: 'First Name', value: firstName },
    { key: 'Last Name', value: lastName },
    { key: 'Currency', value: currency },
    { key: 'Language', value: language },
    { key: 'Job Title', value: jobTitle },
    { key: 'Balance', value: balance },
  ];

  async function UpdateNote(id: string, notes: string, token: string) {
    try {
      const brand = await TAupdateBrandNote(id, notes, token);
      if (brand) {
        alert('Note updated successfully');
      }
    } catch (error) {
      throw error;
    }
  }
  async function DeleteNote(id: string, token: string) {
    try {
      const brand = await TAdeleteNote(id, token);
      if (brand) {
        alert('Note deleted successfully');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <div className="profile-section bg-white p-3 shadow-md mb-3 w-3/5">
        <h3 className="section-title text-xl font-bold mb-3">Brand Information</h3>
        <table className="table-responsive">
          <tbody>
            {brandInfo.map((info: InfoType) => (
              <tr>
                <td className="font-bold text-md">{info.key}</td>
                <td className="font-semibold">=</td>
                <td className="font-semibold">{info.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500">Note</label>
            <textarea
              className="border border-gray-300 rounded-md p-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className='flex gap-12'>
            <button
              className="bg-blue-500 text-white rounded-md px-3 py-2 mt-2 w-full"
              onClick={() => UpdateNote(_id, notes, token)}
            >
              Update Note
            </button>
            <button className="bg-blue-500 text-white rounded-md px-3 py-2 mt-2 w-full" onClick={() => DeleteNote(_id, token)}>
              Delete Note
            </button>
          </div>
        </div>
        {(billingAddress.address ||
          billingAddress.city ||
          billingAddress.contactName ||
          billingAddress.country ||
          billingAddress.firm_name ||
          billingAddress.id ||
          billingAddress.type ||
          billingAddress.zipCode) && (
          <>
            <h3 className="section-title text-lg font-semibold mb-3 mt-5">Billing Information</h3>
            <tr className="flex">
              <td className="flex w-full flex-col ml-3 info-value">
                <tr className="font-bold">
                  Type : <span className="font-semibold">{billingAddress.type}</span>
                </tr>
                <div className="border-t border-gray-200 my-2" />
                <tr className="font-bold">
                  Firm Name : <span className="font-semibold">{billingAddress.firm_name}</span>
                </tr>
                <div className="border-t border-gray-200 my-2" />
                <tr className="font-bold">
                  Contact Name : <span className="font-semibold">{billingAddress.contactName}</span>
                </tr>
                <div className="border-t border-gray-200 my-2" />
                <tr className="font-bold">
                  ID : <span className="font-semibold">{billingAddress.id}</span>
                </tr>
                <div className="border-t border-gray-200 my-2" />
                <tr className="font-bold">
                  City : <span className="font-semibold">{billingAddress.city}</span>
                </tr>
                <div className="border-t border-gray-200 my-2" />
                <tr className="font-bold">
                  Country : <span className="font-semibold">{billingAddress.country}</span>
                </tr>
                <div className="border-t border-gray-200 my-2" />
                <tr className="font-bold">
                  Address : <span className="font-semibold">{billingAddress.address}</span>
                </tr>
                <div className="border-t border-gray-200 my-2" />
                <tr className="font-bold">
                  Zip Code : <span className="font-semibold">{billingAddress.zipCode}</span>
                </tr>
              </td>
            </tr>{' '}
          </>
        )}
        {moneyExchanges.length > 0 && (
          <table className="table-auto mt-10">
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
