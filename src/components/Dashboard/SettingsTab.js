import { useContext, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { updateDisplayPicture,updateNickname,updateNotificationStatus,deleteAccount } from "../../operations/useroperations";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SettingsTab() {
  const navigate = useNavigate();
  const [picturebtn, setPicturebtn] = useState(false);
  const [notificationbtn, setNotificationbtn] = useState(false);
  const [nicknamebtn, setNicknamebtn] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const {user, setToken, setUser} = useContext(AppContext);
  const [isNotificationOn, setIsNotificationOn] = useState(user.notificationbtn);

  const handleNotificationToggle = () => {
    setIsNotificationOn((prev) => !prev);
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const upload = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "b9b8d091c20f70373cf2",
            pinata_secret_api_key: "b7148047bfcec64d563e6dbc6f5eb4d2cf84a9fff0df6e3b88c240868849c270",
            "Content-Type": "multipart/form-data",
          },
        });

        const ipfsHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        return ipfsHash; // Return the IPFS link
      } catch (error) {
        console.error("Error uploading file to Pinata:", error);
        throw new Error("File upload failed");
      }
    }
    return null; // Return null if no file
  };

  const handleProfilePictureSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();

    if(profilePicture){

    const image = await upload(profilePicture);
    console.log(image);    
    try {
        const res = await updateDisplayPicture(image)();
        console.log("token", res?.data?.data?.token)
        setToken(res?.data?.data?.token)
        setUser(res?.data?.data)
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        localStorage.setItem("token", JSON.stringify(res?.data?.data?.token));
        setPicturebtn(false)
      toast.dismiss(toastId);

    } catch (error) {
        console.error('Profile Picture upload error:', error);
      toast.dismiss(toastId);

    }
   }
  };


  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    console.log("Notification status updated to:", isNotificationOn ? "On" : "Off");
    try {
      const res = await updateNotificationStatus(isNotificationOn)();
      console.log("token", res?.data?.token)
      setToken(res?.data?.token)
      console.log("user:", res?.data)
      setUser(res?.data)
      localStorage.setItem("user", JSON.stringify(res?.data));
      localStorage.setItem("token", JSON.stringify(res?.data?.token));
      setNotificationbtn(false)
    } catch (error) {
        console.error('Notification error:', error);
    }
    setNotificationbtn(false);
  };

  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    if (newNickname) {
      console.log("Nickname updated to:", newNickname);

      try {
        const res = await updateNickname(newNickname)();
        console.log("token", res?.data?.token)
        setToken(res?.data?.token)
        console.log("user:", res?.data)
        setUser(res?.data)
        localStorage.setItem("user", JSON.stringify(res?.data));
        localStorage.setItem("token", JSON.stringify(res?.data?.token));
        setNotificationbtn(false)
      } catch (error) {
          console.error('Nickname error:', error);
      }
      setNewNickname("");
      setNicknamebtn(false);
    }
  };

  const DeleteAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (confirmation) {
      try {
        // Call the deleteAccount function and execute the returned function
        const res = await deleteAccount()(); // Execute the returned async function
        console.log(res);
  
        if (res && res.success) { 
            setToken(null);
            setUser(null);
            localStorage.clear();
            navigate('/'); 
        } else {
            alert(res.message || "Failed to delete account. Please try again.");
        }
      } catch (err) {
        console.error('Error deleting account:', err);
        alert("An error occurred while trying to delete your account. Please try again later.");
      }
    }
  };
  


  return (
    <div className="h-full">
      <h1 className="h-[7%] flex items-start font-ramabhadra text-2xl w-full font-semibold">
        Customize your experience.
      </h1>
      <div className="h-[93%] w-full flex flex-col pr-10 pb-[3vh] justify-start items-center">
        <div className="w-full h-[80%] flex flex-col items-center ">
          <div className="w-[82%] my-6 gap-2 flex flex-col justify-center items-center">
            {/* Change Profile Picture */}
            <div className="w-full flex flex-col">
              <button
                onClick={() => setPicturebtn((prev) => !prev)}
                className="justify-between px-6 items-center flex w-full h-12 border-[0.1rem] border-black bg-[#D9D9D9] hover:bg-[#bcbbbb]"
              >
                <span className="font-radioCanada text-xl">Change Profile Picture</span>
                {picturebtn ? <IoIosArrowForward className="rotate-90" /> : <IoIosArrowForward />}
              </button>
              <div className="w-full">
                {picturebtn && (
                  <form onSubmit={handleProfilePictureSubmit} className="w-full flex justify-between items-center px-6 py-3 bg-white">
                    <div>
                      <label className="w-[40%]">
                        <p className="mb-1 font-semibold text-richblack-5">
                          Upload File <sup className="text-[#FF6500]">*</sup>
                        </p>
                        <input
                          required
                          type="file"
                          name="profilePicture"
                          onChange={handleProfilePictureChange}
                          className="w-full rounded-[0.5rem] border-2 bg-richblack-800 p-[12px] text-richblack-5"
                        />
                      </label>
                    </div>
                    <button className="flex justify-center px-3 py-2 border-orange-700 border-2 hover:bg-orange-600 items-center bg-[#FF6500] text-white font-semibold">
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Change Notification Status */}
            <div className="w-full flex flex-col">
              <button
                onClick={() => setNotificationbtn((prev) => !prev)}
                className="justify-between px-6 items-center flex w-full h-12 border-[0.1rem] border-black bg-[#D9D9D9] hover:bg-[#bcbbbb]"
              >
                <span className="font-radioCanada text-xl">Change Notification Status</span>
                {notificationbtn ? <IoIosArrowForward className="rotate-90" /> : <IoIosArrowForward />}
              </button>
              <div className="w-full">
                {notificationbtn && (
                  <form onSubmit={handleNotificationSubmit} className="w-full flex justify-between items-center px-6 py-3 bg-white">
                    <div>
                      <label className="w-[40%]">
                        <p className="mb-1 font-semibold text-richblack-5">
                          Notification Status <sup className="text-[#FF6500]">*</sup>
                        </p>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isNotificationOn}
                            onChange={handleNotificationToggle}
                            className="hidden"
                            id="notificationToggle"
                          />
                          <label
                            htmlFor="notificationToggle"
                            className={`relative w-14 h-7 bg-richblack-800 rounded-full cursor-pointer ${
                              isNotificationOn ? "bg-green-500" : "bg-gray-400"
                            }`}
                          >
                            <span
                              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                                isNotificationOn ? "transform translate-x-7" : ""
                              }`}
                            ></span>
                          </label>
                          <span className="ml-2 text-richblack-5">{isNotificationOn ? "On" : "Off"}</span>
                        </div>
                      </label>
                    </div>
                    <button className="flex justify-center px-3 py-2 border-orange-700 border-2 hover:bg-orange-600 items-center bg-[#FF6500] text-white font-semibold">
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Change Nickname */}
            <div className="w-full flex flex-col">
              <button
                onClick={() => setNicknamebtn((prev) => !prev)}
                className="justify-between px-6 items-center flex w-full h-12 border-[0.1rem] border-black bg-[#D9D9D9] hover:bg-[#bcbbbb]"
              >
                <span className="font-radioCanada text-xl">Change Nickname</span>
                {nicknamebtn ? <IoIosArrowForward className="rotate-90" /> : <IoIosArrowForward />}
              </button>
              <div className="w-full">
                {nicknamebtn && (
                  <form onSubmit={handleNicknameSubmit} className="w-full flex justify-between items-center px-6 py-3 bg-white">
                    <div>
                      <label className="w-[40%]">
                        <p className="mb-1 font-semibold text-richblack-5">
                          New Nickname <sup className="text-[#FF6500]">*</sup>
                        </p>
                        <input
                          required
                          type="text"
                          value={newNickname}
                          onChange={handleNicknameChange}
                          className="w-full rounded-[0.5rem] border-2 bg-richblack-800 p-[12px] text-richblack-5"
                        />
                      </label>
                    </div>
                    <button className="flex justify-center px-3 py-2 border-orange-700 border-2 hover:bg-orange-600 items-center bg-[#FF6500] text-white font-semibold">
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Delete Account */}
          <div className=" w-[82%]  my-6 flex flex-col items-end">
            <button onClick={DeleteAccount} className="flex justify-center px-3 py-2 border-orange-700 border-2 hover:bg-red-700 items-center bg-red-500 text-white font-semibold">
              <BsTrashFill className="mr-2" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
