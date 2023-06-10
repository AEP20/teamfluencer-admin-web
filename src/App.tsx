import { BrowserRouter as Router, Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Index from './screens/Index';
import { login, logout, selectUser } from './redux/store/userSlice';
import { useSelector } from 'react-redux';
import Setting from './components/Setting';

function App() {
  const storedUser = useSelector(selectUser); // Redux durumunu al
  const user = localStorage.getItem('user') || storedUser; // LocalStorage'dan kullanıcıyı al
  console.log('user', user);

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
      <Setting />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </>
  );
}
