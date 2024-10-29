import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { tabs } from './Tabs';
import Calendar from './Dashboard/Calendar';
import ProfileTab from './Dashboard/ProfileTab';
import { IoIosArrowForward } from 'react-icons/io';
import { BsArrowDownSquareFill, BsBoxArrowRight } from "react-icons/bs";
import { AppContext } from '../context/AppContext';
import { IoNotificationsOffOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import SettingsTab from './Dashboard/SettingsTab';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('calendar');
  
  const navigate = useNavigate();

  const {setToken, setUser, token, user} = useContext(AppContext);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear(); 
    navigate('/'); 
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'calendar':
        return <Calendar />;
      case 'profile':
        return <ProfileTab />;
      case 'setting':
        return <SettingsTab/>  
      default:
        return null;
    }
  };

  if(!user){
    console.log("user: ",user)
    console.log("token: ",token)
    window.location.reload(); 
    return null;
  } 


  return (
    <div className="flex flex-row h-[100vh] w-full justify-center items-center">
      
      <div className="h-[100vh] w-1/4 flex flex-col-reverse pl-10 pr-10 justify-center items-end">
        <div className="h-[94vh] w-full flex flex-col justify-between pb-16 shadow-black shadow-lg bg-[#0B192C] rounded-3xl">
          <div className='w-full flex justify-center items-center font-ramabhadra font-semibold text-2xl mb-5 text-[#FF6500] mt-6'>Task Manager</div>

          <div className='flex m-5 justify-between px-5 mt-2 items-center'>
            <img className='h-12 rounded-full w-12' alt='user' src={user.image} />
            <div className='flex flex-col'>
              <h2 className='font-radioCanada text-sm text-white'>{user.firstName}</h2>
              <span className='font-radioCanada text-[0.6rem] text-white'>{user.profession}</span>
            </div>
            <button className='text-[#FF6500] rounded-sm'><BsArrowDownSquareFill className='bg-white rounded-sm' /></button>
          </div>

          <div className="flex flex-col gap-2 px-10 pb-56 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}  
                className={`flex justify-between text-xl items-center w-full h-7 text-white ${selectedTab === tab.value ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
              >
                <tab.icon className='' />
                <span className='flex justify-start w-2/4'>{tab.name}</span>
                <IoIosArrowForward className='' />
              </button>
            ))}
          </div>

          <div className='w-full px-7'>
            <button onClick={handleLogout} className='flex items-center rounded-lg w-full py-1 bg-[#FF6500]'>
              <BsBoxArrowRight className='ml-5 text-white font-bold' />
              <span className='ml-5 font-radioCanada text-white font-semibold'>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-[100vh] w-3/4">
        <nav className='w-full h-[10vh] flex items-end justify-between'>
          <h2 className='font-radioCanada text-[#747373] font-semibold text-sm'>Hello {user.nickname !== "" ? user.nickname : user.firstName}</h2>
          <div className='flex justify-center items-center mr-20 gap-5 text-2xl'>
            { user.notification ? 
              (<IoNotificationsOutline/>) : (<IoNotificationsOffOutline/>)
            }
          </div>
        </nav>

        <div className='w-full h-[90vh]'>
          {renderTabContent()} 
        </div>
      </div>
    </div>
  );
}
