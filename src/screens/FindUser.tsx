import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, logout, selectUser } from '../redux/store/userSlice';
import { TAlogin, TAsignup } from '../services/authAPI';

const FindUser = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center ">
      <h1>Find User</h1>
    </div>
  );
};

export default FindUser;
