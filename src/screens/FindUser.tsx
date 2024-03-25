import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import { TAfindUser, TAfindUserById, TAfindUsername } from '../services/userAPI';
import { ProfileData } from '../types/profileData';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';

const FindUser = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await TAfindUserById(id, token);
          setProfileData(response);
        } catch (error) {
          throw error;
        }
      };
      fetchData();
    }
  }, [id, token]);

  useEffect(() => {
    dispatch(setPageTitle('Kullanıcı Bul'));
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autofillUsernames, setAutofillUsernames] = useState<string[]>([]);

  const handleForm = async (e: any) => {
    e.preventDefault();

    let data;

    if (email !== '' && phone === '' && username === '') {
      data = { email };
    } else if (phone !== '' && email === '' && username === '') {
      data = { phone };
    } else if (phone === '' && email === '' && username !== '') {
      data = { username };
    } else if (phone === '' && email === '' && username === '') {
      setError('Please provide email or phone');
      return;
    } else {
      setError('Please provide only email or phone');
      return;
    }

    try {
      const response = await TAfindUser(data, token);
      const object = {
        _id: response._id,
        username: response.username,
        email: response.email,
        phone: response.phone,
        birthday: response.birthday,
        name: response.name,
        instagram: response.instagram,
        tiktok: response.tiktok,
        money: response.money,
        job: response.job,
        country: response.country,
        city: response.city,
        gender: response.gender,
        isWaitingVerification: response.isWaitingVerification,
        deleted: response.deleted,
        hobbies: response.hobbies,
        verification: response.verification,
      };
      setProfileData(object);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.error);
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const autofillUsername = async () => {
      try {
        const response = await TAfindUsername(username, token);
        setAutofillUsernames(response);
      } catch (error) {
        throw error;
      }
    };
    if (username.length > 1) {
      autofillUsername();
    }
  }, [username]);

  const handleSuggestionClick = (selectedUsername: any) => {
    setUsername(selectedUsername);
    setAutofillUsernames([]);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start min-h-screen bg-cover bg-center relative">
      <div className="w-full">{profileData && <UserProfile {...profileData} />}</div>
      <form className="w-1/4 absolute right-6 ">
        <h2 className="text-sm font-bold mb-1 mt-3 ml-2">User Mail</h2>
        <input
          type="email"
          placeholder="email@mail.com"
          className="form-input text-sm"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Username</h2>
        <input
          type="username"
          placeholder="username"
          className="form-input text-sm"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        {autofillUsernames.length > 0 && (
          <ul className="suggestion-list" style={{ position: 'absolute', zIndex: 9999 }}>
            {[...new Set(autofillUsernames)].slice(0, 5).map((autofillUsername, index) => (
              <li
                key={index}
                className="bg-white p-2 m-2 text-black cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(autofillUsername)}
              >
                {autofillUsername}
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-sm font-bold mb-1 mt-3 ml-2">User No</h2>
        <input
          type="tel"
          placeholder="phone number (ex: 905555555555)"
          className="form-input text-sm"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex justify-center">
          <button type="button" onClick={handleForm} className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindUser;
