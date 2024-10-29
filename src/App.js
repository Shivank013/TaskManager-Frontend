import React, { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';
import Dashboard from "./components/Dashoard"
import {login, signup, sendOtp} from "./operations/useroperations"
import { toast } from "react-hot-toast";
import './App.css';

function App() {

  const [selected, setSelected] = useState('login');

  const { token, setToken} = useContext(AppContext);

  const [showconfirm, setShowconfirm] = useState(false);

  const [otp, setOtp] = useState({
    otp: ''
  });

  const [signupFormData, setSignupFormData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    profession: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  // Handlers for onChange events
  const handleSignupChange = (e) => {
    setSignupFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginChange = (e) => {
    setLoginFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  // onSubmit handlers for each form
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupFormData.password !== signupFormData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await sendOtp(signupFormData.email)();
      setShowconfirm(true);
    } catch (error) {
      console.error('Sending OTP error:', error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const newuser = await login(loginFormData.email, loginFormData.password)();
      setToken(newuser); 
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(
        signupFormData.firstName, 
        signupFormData.lastName,
        signupFormData.email,
        signupFormData.password,
        signupFormData.confirmPassword,
        signupFormData.profession,
        true,
        signupFormData.nickname,
        otp.otp
      )();
      setShowconfirm(false);
      setSelected("login");
      toast.success("Signup successful! Please log in.");
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error("OTP verification failed. Please try again.");
    }
  };
  return (

    <div className='w-[100vw] h-[100vh]'>

    {
      token === null  ? (

        <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className="background w-[100vh] h-[100vh] overflow-hidden">
          {Array.from({ length: 250 }).map((_, index) => (
            <div className="icon" key={index}></div>
          ))}
        </div>
  
        <div className='absolute flex items-center flex-col p-5 pb-8 bg-[#0B192C] rounded-xl w-[35%]'>
          <h1 className='text-5xl w-full text-center font-bold text-[#FF6500]'>Task Manager</h1>
  
          <div className='w-[90%] mt-10 flex'>
            <div className='p-1 gap-2 border-[2px] border-white flex justify-center items-center rounded-full'>
              {/* Login Button */}
              <button
                onClick={() => setSelected('login')}
                className={`py-2 px-4 text-lg font-semibold rounded-full border-[2px] ${
                  selected === 'login'
                    ? 'bg-[#FF6500] text-white border-white'
                    : 'bg-transparent text-[#FF6500] border-transparent'
                }`}
              >
                Login
              </button>
  
              {/* Signup Button */}
              <button
                onClick={() => setSelected('signup')}
                className={`py-2 px-4 text-lg font-semibold rounded-full border-[2px] ${
                  selected === 'signup'
                    ? 'bg-[#FF6500] text-white border-white'
                    : 'bg-transparent text-[#FF6500] border-transparent'
                }`}
              >
                Signup
              </button>
            </div>
          </div>
  
          {selected === 'signup' && !showconfirm && (
            <form onSubmit={handleSignupSubmit} className="flex w-[90%] flex-col gap-y-4 mt-6">
              <div className="flex w-full mx-auto justify-between items-center gap-x-4">
                <label className='w-[95%]'>
                  <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                    First Name <sup className="text-[#FF6500]">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={signupFormData.firstName}
                    onChange={handleSignupChange}
                    placeholder="Enter first name"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
                </label>
                <label className='w-[95%]'>
                  <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                    Last Name <sup className="text-[#FF6500]">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={signupFormData.lastName}
                    onChange={handleSignupChange}
                    placeholder="Enter last name"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
                </label>
              </div>
  
              <div className="flex w-full mx-auto justify-between items-center gap-x-4">
                <label className='w-[95%]'>
                  <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                    Nickname 
                  </p>
                  <input
                    type="text"
                    name="nickname"
                    value={signupFormData.nickname}
                    onChange={handleSignupChange}
                    placeholder="Enter nickname"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
                </label>
                <label className='w-[95%]'>
                  <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                    Profession <sup className="text-[#FF6500]">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="profession"
                    value={signupFormData.profession}
                    onChange={handleSignupChange}
                    placeholder="Enter profession"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
                </label>
              </div>
  
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-[#FF6500]">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="email"
                  value={signupFormData.email}
                  onChange={handleSignupChange}
                  placeholder="Enter email address"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
  
              <div className="flex w-full mx-auto justify-between items-center gap-x-4">
                <label className='w-[90%]'>
                  <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                    Create Password <sup className="text-[#FF6500]">*</sup>
                  </p>
                  <input
                    required
                    password="true"
                    type="password"
                    name="password"
                    value={signupFormData.password}
                    onChange={handleSignupChange}
                    placeholder="Enter Password"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  />
                </label>
                <label className='w-[90%]'>
                  <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                    Confirm Password <sup className="text-[#FF6500]">*</sup>
                  </p>
                  <input
                    required
                    password="true"
                    type="password"
                    name="confirmPassword"
                    value={signupFormData.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder="Confirm Password"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  />
                </label>
              </div>
  
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-[#FF6500] text-white py-[8px] px-[12px] font-medium"
              >
                Create Account
              </button>
            </form>
          )}
  
          {selected === 'login' && !showconfirm && (
            <form onSubmit={handleLoginSubmit} className="flex w-[90%] flex-col gap-y-4 mt-6">
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-[#FF6500]">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter email address"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
  
              <label className="relative">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Password <sup className="text-[#FF6500]">*</sup>
                </p>
                <input
                  required
                  type="password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter Password"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                />
              </label>
  
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-[#FF6500] text-white py-[8px] px-[12px] font-medium"
              >
                Log In
              </button>
            </form>
          )}
  
          {showconfirm && (
            <form onSubmit={handleOtpSubmit} className="flex w-[90%] flex-col gap-y-4 mt-6">
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                Enter the OTP sent on your mail <sup className="text-[#FF6500]">*</sup>
              </p>
              <input
                required
                type="text"
                name="otp"
                value={otp.otp}
                onChange={handleOtpChange}
                placeholder="Enter otp"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
  
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-[#FF6500] text-white py-[8px] px-[12px] font-medium"
            >
              Confirm
            </button>
          </form>
          )}
        </div>
      </div>

      ) 
      : (<Dashboard/>)
    }

    </div>

  );
}

export default App;
