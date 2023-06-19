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
import FindBrand from './screens/FindBrand';
import AllBrands from './screens/AllBrands';
import DoApprovalScreen from './screens/DoApprovalScreen';
import APIdocsScreen from './screens/APIdocsScreen';

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
        <Route path="/brands/*" element={user ? <BrandsLayout /> : <Navigate to="/auth/login" />} />
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
      <CommonLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/api-docs" element={<APIdocsScreen />} />
        </Routes>
      </CommonLayout>
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
          <Route path="/do-approval" element={<DoApprovalScreen />} />
        </Routes>
      </CommonLayout>
    </>
  );
}

function BrandsLayout() {
  return (
    <>
      <CommonLayout>
        <Routes>
          <Route path="/find" element={<FindBrand />} />
          <Route path="/find-all" element={<AllBrands />} />
        </Routes>
      </CommonLayout>
    </>
  );
}
