import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Index from './screens/Index';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<RegisterScreen />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
