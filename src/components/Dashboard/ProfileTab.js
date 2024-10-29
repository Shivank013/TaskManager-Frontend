import cover from "../../public/images/cover.jpg"
import { FiEdit } from "react-icons/fi";
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';


export default function ProfileTab() {

  const {  user } = useContext(AppContext);

    return (
      <div className=" h-full">
         <h1 className=" h-[7%] flex items-start font-ramabhadra text-2xl w-full font-semibold">Your story, your way.</h1>
         <div className=" h-[93%] w-full flex flex-col pr-10 pb-[3vh] justify-center items-center">
            <div className=" flex flex-col justify-center items-center w-full h-[32%]">
              <div className=" w-full h-full bg-orange-500">
                <img className=" h-full w-full object-cover" alt="" src={cover}/>
              </div>
              <div className=" h-[10rem] w-[10rem] z-5 border-[1rem] mt-[11%] border-white absolute rounded-full ">
                <img className=" w-full h-full rounded-full" alt="" src={user?.image}/>
              </div>
            </div>
            <div className=" flex justify-between items-center w-full h-[67%] bg-red-600">
              <div className=" flex flex-col gap-3 py-10 px-24 w-[49.8%] h-full bg-white">
                <div className=" flex items-center mb-5 font-radioCanada text-2xl gap-1"><span>Profile Info</span></div>
                <div className=" text-[#656565] flex items-center font-radioCanada text-lg"> <span >Name:</span> <span className="ml-2">{user.firstName} {user.lastName}</span> </div>
                <div className=" text-[#656565] flex items-center font-radioCanada text-lg"> <span >Nickname:</span> <span className="ml-2">{user.nickname}</span> </div>
                <div className=" text-[#656565] flex items-center font-radioCanada text-lg"> <span >Profession:</span> <span className="ml-2">{user.profession}</span> </div>
              </div>

              <div className=" flex flex-col gap-3 py-10 px-24 w-[49.8%] h-full bg-white">
                <div className=" flex items-center mb-5 font-radioCanada text-2xl gap-1"><span>Other Info</span></div>
                <div className=" text-[#656565] flex items-center font-radioCanada text-lg"> <span >Email:</span> <span className="ml-2">{user.email}</span> </div>
                <div className=" text-[#656565] flex items-center font-radioCanada text-lg"> <span >Notification:</span> <span className="ml-2">{user.notification ? "on" : "off"}</span> </div>
              </div>
            </div>
         </div>
      </div>
    );
  }