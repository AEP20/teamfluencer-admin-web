import { BrowserRouter as Router, Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Index from './screens/Index';
import { login, logout } from './redux/store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import FindUser from './screens/FindUser';
import { useEffect, startTransition, Suspense } from 'react';
import CommonLayout from './components/CommonLayout';
import WaitingApprovalUser from './screens/WaitingApprovalUser';
import FindBrand from './screens/FindBrand';
import AllBrands from './screens/AllBrands';
import DoApprovalScreen from './screens/DoApprovalScreen';
import APIdocsScreen from './screens/APIdocsScreen';
import GetAllUsers from './screens/GetAllUsers';
import DoApprovalCampaigns from './screens/DoApprovalCampaigns';
import { selectToken } from './redux/store/userSlice';

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    if (tokenString && !token) {
      console.log('TOKENNNN', token);
      dispatch(login({ token: tokenString }));
    }
  }, [dispatch, token]);

  // useEffect(() => {
  //   const userString = localStorage.getItem('user');
  //   const tokenString = localStorage.getItem('token');

  //   if (tokenString && userString && !token) {
  //     const user = JSON.parse(userString);
  //     dispatch(login({ user, token: tokenString }));
  //   }
  // }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={!token ? <AuthLayout /> : <Navigate to="/" />} />
        <Route path="/*" element={token ? <MainLayout /> : <Navigate to="/auth/login" />} />
        <Route path="/user/*" element={token ? <UserLayout /> : <Navigate to="/auth/login" />} />
        <Route path="/brands/*" element={token ? <BrandsLayout /> : <Navigate to="/auth/login" />} />
        <Route path="/campaigns/*" element={token ? <CampaignsLayout /> : <Navigate to="/auth/login" />} />
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
            <Route path="/" element={<Index />} />
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
          </Routes>
        </CommonLayout>
      </Suspense>
    </>
  );
}
