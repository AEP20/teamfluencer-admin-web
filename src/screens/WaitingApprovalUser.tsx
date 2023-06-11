import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, logout, selectUser } from '../redux/store/userSlice';
import { TAlogin, TAsignup } from '../services/authAPI';
import React from 'react';
import UserProfile from '../components/UserProfile';
import { TAfindUser } from '../services/userAPI';
import { ProfileData } from '../types/profileData';

const FindUser = () => {
  return <h1>WaitingApproval</h1>;
};

export default FindUser;
