import { useEffect } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Index from './screens/Index';
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from './redux/store/userSlice';

function App() {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={!user ? <AuthLayout /> : <Navigate to="/" />} />
        <Route path="/*" element={user ? <MainLayout /> : <Navigate to="/auth/login" />} />
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
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </>
  );
}
