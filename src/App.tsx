import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { login } from './redux/store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import FindUser from './screens/FindUser';
import { useEffect, Suspense } from 'react';
import CommonLayout from './components/CommonLayout';
import WaitingApprovalUser from './screens/WaitingApprovalUser';
import FindBrand from './screens/FindBrand';
import AllBrands from './screens/AllBrands';
import AllCampaign from './screens/AllCampaign';
import DoApprovalScreen from './screens/DoApprovalScreen';
import APIdocsScreen from './screens/APIdocsScreen';
import GetAllUsers from './screens/GetAllUsers';
import DoApprovalCampaigns from './screens/DoApprovalCampaigns';
import { selectToken } from './redux/store/userSlice';
import ApprovedUsers from './screens/ApprovedUsers';
import ApprovedCampaigns from './screens/ApprovedCampaigns';
import Dashboard from './screens/Dashboard';
import HashtagSearch from './screens/HashtagSearch';

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    if (tokenString && !token) {
      dispatch(login({ token: tokenString }));
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={token ? <Navigate to="/statistics/dashboard" /> : <AuthLayout />} />
        <Route path="/*" element={token ? <MainLayout /> : <Navigate to="/auth/login" />} />
        <Route path="/user/*" element={token ? <UserLayout /> : <AuthLayout />} />
        <Route path="/brands/*" element={token ? <BrandsLayout /> : <AuthLayout />} />
        <Route path="/campaigns/*" element={token ? <CampaignsLayout /> : <AuthLayout />} />
        <Route path="/statistics/*" element={token ? <StatisticsLayout /> : <AuthLayout />} />
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
      <Suspense fallback={<div>Loading...</div>}>
        <CommonLayout>
          <Routes>
            {/* <Route path="/" element={<Index />} /> */}
            <Route path="/api-docs" element={<APIdocsScreen />} />
          </Routes>
        </CommonLayout>
      </Suspense>
    </>
  );
}

function UserLayout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonLayout>
          <Routes>
            <Route path="/find" element={<FindUser />} />
            <Route path="/find-waiting-approval" element={<WaitingApprovalUser />} />
            <Route path="/do-approval" element={<DoApprovalScreen />} />
            <Route path="/getall" element={<GetAllUsers />} />
            <Route path="/find-approved-users" element={<ApprovedUsers />} />
            <Route path="/find/:id" element={<FindUser />} />
          </Routes>
        </CommonLayout>
      </Suspense>
    </>
  );
}

function BrandsLayout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonLayout>
          <Routes>
            <Route path="/find" element={<FindBrand />} />
            <Route path="/find-all" element={<AllBrands />} />
            <Route path="/find/:id" element={<FindBrand />} />
          </Routes>
        </CommonLayout>
      </Suspense>
    </>
  );
}

function CampaignsLayout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonLayout>
          <Routes>
            <Route path="/find" element={<FindBrand />} />
            <Route path="/find-all" element={<AllBrands />} />
            <Route path="/do-approval" element={<DoApprovalCampaigns />} />
            <Route path="/find-all-campaigns" element={<AllCampaign />} />
            <Route path="/approved-campaigns" element={<ApprovedCampaigns />} />
          </Routes>
        </CommonLayout>
      </Suspense>
    </>
  );
}

function StatisticsLayout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hashtag-search" element={<HashtagSearch />} />
          </Routes>
        </CommonLayout>
      </Suspense>
    </>
  );
}
