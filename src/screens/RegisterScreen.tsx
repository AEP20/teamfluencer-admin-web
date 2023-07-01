import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { useEffect } from 'react';
import React from 'react';

function RegisterScreen() {
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(setPageTitle('Register Boxed'));
  //   });
  const navigate = useNavigate();
  //   const isDark =
  //     useSelector(state => state.themeConfig.theme) === 'dark' ? true : false;

  const submitForm = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('./assets/images/map.svg')] dark:bg-[url('./assets/images/map-dark.svg')]">
        <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
          <h2 className="font-bold text-2xl mb-3">Sign Up</h2>
          <p className="mb-7">Enter your email and password to register</p>
          <form className="space-y-5" onSubmit={submitForm}>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" className="form-input" placeholder="Enter Name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="form-input" placeholder="Enter Email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-input" placeholder="Enter Password" />
            </div>
            <div>
              <label className="cursor-pointer">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-white-dark">
                  I agree the{' '}
                  <button type="button" className="text-primary hover:underline">
                    Terms and Conditions
                  </button>
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              SIGN UP
            </button>
          </form>
          <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
            <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
              <span>OR</span>
            </div>
          </div>
          <p className="text-center">
            Already have an account ?
            <Link to="/auth/login" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
