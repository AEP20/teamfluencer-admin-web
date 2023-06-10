import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Index from './screens/Index';
import {useSelector} from 'react-redux';
import { login, logout, selectUser } from './redux/store/userSlice';


function ProtectedIndex() {
  const user =  useSelector(selectUser);
  const navigate = useNavigate();
  console.log("App user:"+user)
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
          <Route path="/register" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<ProtectedIndex />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
