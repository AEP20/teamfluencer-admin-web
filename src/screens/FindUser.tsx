import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import { TAfindUser, TAfindUserById } from '../services/userAPI';
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
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    dispatch(setPageTitle('Kullanıcı Bul'));
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start min-h-screen bg-cover bg-center relative">
      <div className="w-full">{profileData && <UserProfile {...profileData} />}</div>
      <form className="space-y-2 w-1/4 absolute top-5 right-6 ">
        <input
          type="email"
          placeholder="email@mail.com"
          className="form-input text-sm"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="username"
          placeholder="username"
          className="form-input text-sm"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          type="tel"
          placeholder="6-(666)-111-7777"
          className="form-input text-sm"
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
