import React, { useEffect, useState } from 'react';
import { MoneyExchanges, BillingAddress, BrandType, InfoType, Meetings } from '../types/brandData';
import './styles/styles.css';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/store/userSlice';
import { TAupdateBrand, TAupdateBrandLogo, TAupdateBrandMeeting, TAupdateBrandNote } from '../services/brandAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const BrandProfile = ({
  _id,
  email,
  phone,
  country,
  first_name,
  last_name,
  currency,
  language,
  job_title,
  brand_name,
  balance,
  billing_address,
  money_exchanges,
  notes,
  brand_logo,
  meetings,
}: BrandType) => {
  const token = useSelector(selectToken);

  const [isOpen, setIsOpen] = useState(false);
  const [logo_url, setLogo_url] = useState('');
  const [brandNotes, setBrandNotes] = useState(['']);
  const [notess, setNotess] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [brandMeetings, setBrandMeetings] = useState<Meetings>([
    {
      time: new Date(),
      description: '',
    },
  ]);
  const [moneyExchanges, setMoneyExchanges] = useState<MoneyExchanges[]>(money_exchanges.slice(0, 50) ?? []);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>(
    billing_address ?? {
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

  useEffect(() => {
    if (Array.isArray(notes) && notes.length > 0) {
      setBrandNotes(notes);
    } else {
      setBrandNotes(['']);
    }
  }, [notes]);

  useEffect(() => {
    if (meetings && Array.isArray(meetings)) {
      setBrandMeetings(meetings);
    }
  }, [meetings, brandMeetings]);

  const brandInfo: InfoType[] = [
    { key: 'Brand Name', value: brand_name },
    { key: 'Email', value: email },
    { key: 'Phone', value: phone },
    { key: 'Country', value: country },
    { key: 'First Name', value: first_name },
    { key: 'Last Name', value: last_name },
    { key: 'Currency', value: currency },
    { key: 'Language', value: language },
    { key: 'Job Title', value: job_title },
    { key: 'Balance', value: balance },
    { key: 'Brand Id', value: _id },
  ];

  const handleUpdateNote = async (brandNotes: any) => {
    try {
      const brand = await TAupdateBrandNote(_id, brandNotes, token);
      if (brand) alert('Note updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = (index: any) => {
    const newNotes = brandNotes.filter((note, noteIndex) => noteIndex !== index);
    handleUpdateNote(newNotes);
  };

  const handleUpdateMeeting = async (brandMeetings: any) => {
    try {
      const brand = await TAupdateBrandMeeting(_id, brandMeetings, token);
      if (brand) alert('Meeting updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMeeting = (index: any) => {
    if (brandMeetings !== undefined) {
      const newMeetings = brandMeetings.filter((meeting, meetingIndex) => meetingIndex !== index);
      handleUpdateMeeting(newMeetings);
    }
  };

  const handleUploadPhoto = async (logo_url: any) => {
    try {
      TAupdateBrand(_id, { brand_logo: logo_url }, token);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectPhotoFromPC = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        if (!(e.target instanceof HTMLInputElement) || !e.target.files) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('brand_logo', file);

        try {
          const response = await TAupdateBrandLogo(_id, formData, token);
          if (!response.ok) {
            throw new Error('Failed to upload brand logo');
          }

          const result = await response.json();
        } catch (error) {
          console.error('Error uploading photo:', error);
        }
      };
      input.click();
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: any) => {
    if (time !== null) {
      const newDate = new Date(selectedDate);
      const [hours, minutes] = time.split(':');
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setSelectedDate(newDate);
    }
  };

  return (
    <div className="profile-section bg-white p-3 shadow-md mb-3 w-3/5">
      <h3 className="section-title text-xl font-bold mb-3">Brand Information</h3>
      {brand_logo && (
        <div className="flex items-center">
          <img src={brand_logo} alt="Brand Logo" className="w-20 h-20 rounded-full mr-4" />
          {!isOpen && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(true)}
            >
              Change Picture
            </button>
          )}
        </div>
      )}
      {!brand_logo && (
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
            className="border border-gray-400 rounded py-2 px-4 mb-2 mt-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => handleUploadPhoto(logo_url)}
          >
            Save
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => handleSelectPhotoFromPC()}
          >
            Select Photo from Computer
          </button>
        </div>
      )}

      <table className="table-responsive">
        <tbody>
          {brandInfo.map((info, index) => (
            <tr key={index}>
              <td className="font-bold text-md">{info.key}</td>
              <td className="font-semibold">=</td>
              <td className="font-semibold">{info.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Brand Notes */}
      <div className="flex flex-col mt-2">
        <label className="text-sm font-semibold text-gray-500">Notes</label>
        <div className="flex bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex flex-col mt-2">
            <textarea
              className="w-full p-2 border border-gray-200 rounded-md mb-4"
              placeholder="Write a note"
              value={notess}
              onChange={(e) => setNotess(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white rounded-md px-3 py-2 w-full"
              onClick={() => handleUpdateNote([...brandNotes, notess])}
            >
              Add Note
            </button>
          </div>
          <div className="flex-grow ml-8">
            <ul>
              {brandNotes
                .filter((note) => note !== '')
                .map((note, index) => (
                  <li key={index} className="flex items-center">
                    <p className="text-gray-600 mt-2">{note}</p>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="mt-2"
                      style={{ color: '#005eff', marginLeft: '8px', cursor: 'pointer' }}
                      onClick={() => handleDeleteNote(index)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Brand Meetings */}
      <div className="flex flex-col mt-2">
        <label className="text-sm font-semibold text-gray-500">Meetings</label>
        <div className="flex bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex flex-col mt-2">
            <TimePicker
              onChange={handleTimeChange}
              value={selectedDate ? selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
              className="w-full p-2 border border-gray-200 rounded-md mb-4"
              disableClock={true}
              clearIcon={null}
            />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-200 rounded-md mb-4"
              placeholderText="mm/dd/yyyy"
            />
            <textarea
              className="w-full p-2 border border-gray-200 rounded-md mb-4"
              placeholder="Add a description"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white rounded-md px-3 py-2 w-full"
              onClick={() =>
                handleUpdateMeeting([...brandMeetings, { time: selectedDate, description: meetingDescription }])
              }
            >
              Add Meeting
            </button>
          </div>
          <div className="flex-grow ml-8">
            <ul>
              {brandMeetings.map((meeting, index) => (
                <li key={index} className="flex items-center">
                  <p className="text-gray-600 mt-2">{new Date(meeting.time).toLocaleString('tr-TR')}</p>
                  <p className="text-gray-600 mt-2 ml-4 font-bold">{meeting.description}</p>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mt-2"
                    style={{ color: '#005eff', marginLeft: '8px', cursor: 'pointer' }}
                    onClick={() => handleDeleteMeeting(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {Object.values(billingAddress).some((value) => value) && (
        // Only render this section if there's any value in billingAddress
        <div className="mt-5">
          <h3 className="section-title text-lg font-semibold mb-3">Billing Information</h3>
          <table className="flex">
            <tbody>
              <tr className="flex w-full flex-col ml-3 info-value">
                {Object.entries(billingAddress).map(([key, value]) => (
                  <td key={key} className="font-bold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-semibold">{value}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
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
            {moneyExchanges.map((exchange, index) => (
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
  );
};

export default BrandProfile;
