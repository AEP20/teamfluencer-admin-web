import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Index from './screens/Index';

function ProtectedIndex() {
  const user = "eşşek"; // Burada gerçek bir kimlik doğrulama mekanizması olmalı
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? <Index /> : null;
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<ProtectedIndex />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
