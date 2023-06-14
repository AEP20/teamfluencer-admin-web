import { BrowserRouter as Router, Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Index from './screens/Index';
import { login, logout, selectUser } from './redux/store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Setting from './components/Setting';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FindUser from './screens/FindUser';
import { useEffect, useState } from 'react';
import { IRootState } from './redux/store/index';
import { toggleSidebar } from './redux/store/themeConfigSlice';
import CommonLayout from './components/CommonLayout';
import WaitingApprovalUser from './screens/WaitingApprovalUser';

function App() {
  const storedUser = useSelector(selectUser); // Redux durumunu al
  const user = localStorage.getItem('user') || storedUser; // LocalStorage'dan kullanıcıyı al
  console.log('user', user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={!user ? <AuthLayout /> : <Navigate to="/" />} />
        <Route path="/*" element={user ? <MainLayout /> : <Navigate to="/auth/login" />} />
        <Route path="/user/*" element={user ? <UserLayout /> : <Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function AuthLayout() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
  );
}

function MainLayout() {
  return (
    <>
      <CommonLayout />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </>
  );
}

function UserLayout() {
  return (
    <>
      <CommonLayout>
        <Routes>
          <Route path="/find" element={<FindUser />} />
          <Route path="/find-waiting-approval" element={<WaitingApprovalUser />} />
        </Routes>
      </CommonLayout>
    </>
  );
}

