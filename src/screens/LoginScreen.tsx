import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout, selectUser } from '../redux/store/userSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ name: 'John Doe' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  // const dispatch = useDispatch();
  useEffect(() => {}, []);
  // const isDark =
  //   useSelector(state => state.themeConfig.theme) === 'dark' ? true : false;

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('./assets/images/map.svg')] dark:bg-[url('./assets/images/map-dark.svg')]">
      <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
        <h2 className="font-bold text-2xl mb-3">Sign In</h2>
        <p className="mb-7">Enter your email and password to login</p>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="form-input" placeholder="Enter Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="form-input" placeholder="Enter Password" />
          </div>
          <button type="button" onClick={handleLogin} className="btn btn-primary w-full">
            SIGN IN
          </button>
        </form>
        <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
          <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block"></div>
        </div>
        <p className="text-center">
          Dont&apos;t have an account ?
          <Link to="/auth/register" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
