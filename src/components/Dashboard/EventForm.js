import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { ImCross } from "react-icons/im";
import { getUserDetails } from "../../operations/useroperations";
import {createEvent, deleteEvent, updateLocation, updateDescription} from "../../operations/eventoperations"
import {createMeeting, deleteMeeting, updateMeetingLocation, updateMeetingLink, updateMeetingDescription} from "../../operations/meetingoperations"
import { MdModeEdit } from "react-icons/md";

const EventForm = () => {

  const [selected, setSelected] = useState('event');
  const [locationinput, setLocationinput] = useState(false);
  const [meetinginput, setMeetinginput] = useState(false);
  const [descinput, setDescinput] = useState(false);

  const [updatemeetlink , setUpdatemeetlink] = useState("");
  const [updatelocation , setUpdatelocation] = useState("");
  const [updatedesc , setUpdatedesc] = useState("");

  const { selectedDate, setAddevent, selecteEvent , setSelecteEvent, setCalendarEvents } = useContext(AppContext);

  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    start: selectedDate,
    end: '',
    location: '',
    reminderTime: '',
    recurring: false,
    recurrencePattern: '',
  });

  const [meetingFormData, setMeetinngFormData] = useState({
    title: '',
    description: '',
    start: selectedDate,
    end: '',
    location: '',
    reminderTime: '',
    meetingLink: ''
  });


    const fetchUserDetails = async () => {
        console.log("Fetching user details...");
        try {
            const userData = await getUserDetails();
            const eventsFromUser = userData.data.events || []; 
            const meetingsFromUser = userData.data.meetings || []; 

            // Prepare combined events with extendedProps
            const combinedEvents = [
              ...eventsFromUser,
              ...meetingsFromUser
          ];

            console.log("Combined events:", combinedEvents);
            setCalendarEvents(combinedEvents);
            console.log("User data fetched successfully:", userData);
        } catch (error) {
            console.error('Error in fetching user details:', error.message);
        }
    };

  const UpdateDesc = async () => {
    console.log(descinput)
    if(descinput){

      let res;
      
      try {
        if (selecteEvent.extendedProps?.meetingLink) {
            res = await updateMeetingDescription(selecteEvent.extendedProps._id, updatedesc)();
        } else {
            res = await updateDescription(selecteEvent.extendedProps._id, updatedesc)();
        }

        console.log(res);

        setCalendarEvents((prevEvents) =>
          prevEvents.map(event =>
              event._id === selecteEvent.extendedProps._id
                  ? { ...event, description: updatedesc }
                  : event
          )
      );

      setDescinput(prevState => !prevState)

      } catch (error) {
          console.error('Error deleting event:', error);
      }

    } else {
      setDescinput(prevState => !prevState)
    }

  }


  const UpdateMeetLink = async () => {
    console.log(meetinginput)
    if(meetinginput){

      let res;
      
      try {
        res = await updateMeetingLink(selecteEvent.extendedProps._id, updatemeetlink)();
        console.log(res);

      } catch (error) {
          console.error('Error deleting event:', error);
      }

      setCalendarEvents((prevEvents) =>
        prevEvents.map(event =>
            event._id === selecteEvent.extendedProps._id
                ? { ...event, description: updatemeetlink }
                : event
        )
    );

    setMeetinginput(prevState => !prevState)

    } else {
    setMeetinginput(prevState => !prevState)
    }

  }

  const UpdateLocation = async () => {
    console.log(locationinput)
    if(locationinput){

      let res;
      
      try {
        if (selecteEvent.extendedProps?.meetingLink) {
            res = await updateMeetingLocation(selecteEvent.extendedProps._id, updatelocation)();
        } else {
            res = await updateLocation(selecteEvent.extendedProps._id, updatelocation)();
        }

        console.log(res);

        setCalendarEvents((prevEvents) =>
          prevEvents.map(event =>
              event._id === selecteEvent.extendedProps._id
                  ? { ...event, description: updatelocation }
                  : event
          )
      );
        

      setLocationinput(prevState => !prevState)

      } catch (error) {
          console.error('Error deleting event:', error);
      }

    } else {
    setLocationinput(prevState => !prevState)
    }

  }

  const handleDeleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this?")) {
        console.log("Event id: ", selecteEvent.extendedProps._id);
        console.log("Event id: ", selecteEvent.extendedProps);

        let deleteResponse;

        try {
            if (selecteEvent.extendedProps?.meetingLink) {
                deleteResponse = await deleteMeeting(selecteEvent.extendedProps._id)();
            } else {
                deleteResponse = await deleteEvent(selecteEvent.extendedProps._id)();
            }

            console.log(deleteResponse);

            setCalendarEvents((prevEvents) =>
                prevEvents.filter(event => event._id !== selecteEvent.extendedProps._id)
            );

            setAddevent(false);
            setSelecteEvent(null);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }
};


  const handleEventChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === "true" ? true : value === "false" ? false : value;
    setEventFormData({
      ...eventFormData,
      [name]: newValue
    });
  };

  const handleMeetingChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === "true" ? true : value === "false" ? false : value;
    setMeetinngFormData({
      ...meetingFormData,
      [name]: newValue
    });
  };

  const createEventHanler = async (e) => {
    e.preventDefault();
    console.log("------------Event data ----------");
    console.log(eventFormData);

    try {
        const res = await createEvent(
          eventFormData.title,
          eventFormData.description,
          eventFormData.start,
          eventFormData.end,
          eventFormData.location,
          eventFormData.reminderTime,
          eventFormData.recurring,
          eventFormData.recurrencePattern
        )();
        await fetchUserDetails()
        // setCalendarEvents((prevEvents) => [...prevEvents, eventFormData]);
        console.log( res?.data)
        setAddevent(false)
    } catch (error) {
        console.error('create Event upload error:', error);
        setAddevent(false)
    }

  };

  const createMeetingHandler = async (e) => {
    e.preventDefault();
    console.log("------------Meeting data ----------");
    console.log(meetingFormData)

    try {
        const res = await createMeeting(
          meetingFormData.title,
          meetingFormData.description,
          meetingFormData.start,
          meetingFormData.end,
          meetingFormData.location,
          meetingFormData.meetingLink,
          meetingFormData.reminderTime,
        )();
        await fetchUserDetails()
        // setCalendarEvents((prevEvents) => [...prevEvents, meetingFormData]);
        console.log(res)
        setAddevent(false)
    } catch (error) {
        console.error('create Event upload error:', error);
        setAddevent(false)
    }
  };

  const display = () => {
    setAddevent(false);
    setSelecteEvent(null);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>


      {
        selecteEvent !== null ? (

        <div className='absolute flex items-center flex-col p-5 pb-8 bg-[#0B192C] rounded-xl w-[35%]'>
          <div className="w-[90%] flex justify-between">
          <h1 className='text-5xl w-full text-center font-bold text-[#FF6500]'>{selecteEvent.title}</h1>
          <button  onClick={display} ><ImCross className=" text-[#FF6500] hover:text-[#ff6600c7] text-2xl"/></button>
        </div>
        
        {/* Form Section */}
        {selected === 'event' && (
          <div  className="flex w-[90%] flex-col gap-y-4 mt-6">

              <label className='w-[100%]'>
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1rem] text-richblack-5">
                  Location 
                </p>
                <div
                  className="w-full rounded-[0.5rem] flex justify-between items-center bg-white p-[12px] text-richblack-5"
                >

                  <div className="w-[85%] h-full">
                  {
                    locationinput ? 
                    <input
                    className="w-[100%] p-2 h-full"
                    type="text"
                    name="updatelocation"
                    value={updatelocation}
                    onChange={(e) => setUpdatelocation(e.target.value)}
                    placeholder={selecteEvent.extendedProps.location}
                    />
                     : <span className="w-[100%]">{selecteEvent.extendedProps.location}</span>
                  }
                  
                  </div>
                  
                <button onClick={UpdateLocation} className=" h-full px-2 ">
                  <MdModeEdit className=" text-black text-2xl"/> 
                </button>
                </div>
              </label>

           
            <div className="flex w-full mx-auto justify-between items-center gap-x-4">
              <label className='w-[95%]'>
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1rem] text-richblack-5">
                  Start Time 
                </p>
                <div
                  className="w-full rounded-[0.5rem] text-start bg-white p-[12px] text-richblack-5"
                >{selecteEvent.start?.toLocaleString()}</div>
              </label>
              <label className='w-[95%]'>
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1rem] text-richblack-5">
                  End Time 
                </p>
                <div
                  className="w-full rounded-[0.5rem] text-start bg-white p-[12px] text-richblack-5"
                >{!selecteEvent.end ? selecteEvent.start?.toLocaleString() : selecteEvent.end?.toLocaleString() || "No end time"}</div>
              </label>
            </div>

            {/* Description Input */}
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1rem] text-richblack-5">
                Description 
              </p>
              <div
                  className="w-full rounded-[0.5rem] flex justify-between items-center text-start bg-white p-[12px] text-richblack-5"
                >

                  <div className="w-[85%] h-full">
                  {
                    descinput ? 
                    <input
                    className="w-[90%] p-2 h-full"
                    type="text"
                    name="updatedesc"
                    value={updatedesc}
                    onChange={(e) => setUpdatedesc(e.target.value)}
                    placeholder={selecteEvent.extendedProps.description}
                    />
                     : <span className="w-[90%]">{selecteEvent.extendedProps.description}</span>
                  }
                  </div>

                <button onClick={UpdateDesc} className=" w-[10%] h-full px-2 ">
                    <MdModeEdit className=" text-black text-2xl"/> 
                </button>
                </div>
            </label>

            {
              selecteEvent.extendedProps?.reminderTime &&
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1rem] text-richblack-5">
                  Reminder Time 
                </p>
                <div
                    className="w-full rounded-[0.5rem] text-start bg-white p-[12px] text-richblack-5"
                  ><span>{selecteEvent.extendedProps.reminderTime}</span>
                  <span></span>
                  </div>
              </label>
            }

            {
              selecteEvent.extendedProps?.meetingLink &&
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1rem] text-richblack-5">
                  Meeting Link 
                </p>
                <div
                    className="w-full rounded-[0.5rem] flex justify-between items-centert text-start bg-white p-[12px] text-richblack-5"
                  >

                    <div className="w-[85%] h-full">
                    {
                    meetinginput ? 
                    <input
                    className="w-[90%] p-2 h-full"
                    type="text"
                    name="updatemeetlink"
                    value={updatemeetlink}
                    onChange={(e) => setUpdatemeetlink(e.target.value)}
                    placeholder={selecteEvent.extendedProps.meetingLink}
                    />
                     : <span className="w-[90%]">{selecteEvent.extendedProps.meetingLink}</span>
                  }
                    </div>
                    
                    
                  <button onClick={UpdateMeetLink} className=" w-[10%] h-full px-2 ">
                      <MdModeEdit className=" text-black text-2xl"/> 
                  </button>
                  </div>
              </label>
            }

            { selecteEvent.extendedProps?.recurring && 
                <div className="flex w-full mx-auto justify-between items-center gap-x-4">
                <label className="w-[100%]">
                  <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                    Recurring <sup className="text-[#FF6500]">*</sup>
                  </p>
                  <div
                      className="w-full rounded-[0.5rem] text-start bg-white p-[12px] text-richblack-5"
                    >{selecteEvent.extendedProps.recurring ? "Yes" : "No"}</div>
                </label>
              </div>
            }

            <button
             onClick={handleDeleteEvent}
             type="submit"
             className="mt-6 rounded-[8px] bg-red-500 text-white py-[8px] px-[12px] font-medium"
           >
             Delete 
           </button>

          </div>
        )}

      </div>



        ) : (

      <div className='absolute flex items-center flex-col p-5 pb-8 bg-[#0B192C] rounded-xl w-[35%]'>
        {/* Button Section */}
        <div className='w-[90%] flex justify-between'>
          <div className='p-1 gap-2 border-[2px] border-white flex justify-center items-center rounded-full'>
            {/* Event Button */}
            <button
              onClick={() => setSelected('event')}
              className={`py-2 px-4 text-lg font-semibold rounded-full border-[2px] ${
                selected === 'event'
                  ? 'bg-[#FF6500] text-white border-white'
                  : 'bg-transparent text-[#FF6500] border-transparent'
              }`}
            >
              Event
            </button>

            {/* Meeting Button */}
            <button
              onClick={() => setSelected('meeting')}
              className={`py-2 px-4 text-lg font-semibold rounded-full border-[2px] ${
                selected === 'meeting'
                  ? 'bg-[#FF6500] text-white border-white'
                  : 'bg-transparent text-[#FF6500] border-transparent'
              }`}
            >
              Meeting
            </button>
          </div>
          <button  onClick={() => setAddevent(false)} ><ImCross className=" text-[#FF6500] hover:text-[#ff6600c7] text-2xl"/></button>
        </div>

        {/* Form Section */}
        {selected === 'event' && (
          <form onSubmit={createEventHanler} className="flex w-[90%] flex-col gap-y-4 mt-6">
            {/* Title and Location Inputs */}
            <div className="flex w-full mx-auto justify-between items-center gap-x-4">
              <label className='w-[95%]'>
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Title <sup className="text-[#FF6500]">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="title"
                  value={eventFormData.title}
                  onChange={handleEventChange}
                  placeholder="Enter event title"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
              <label className='w-[95%]'>
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Location <sup className="text-[#FF6500]">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="location"
                  value={eventFormData.location}
                  onChange={handleEventChange}
                  placeholder="Enter event location"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            </div>

            {/* Time and Date Inputs */}
            <div className="flex w-full mx-auto justify-between items-center gap-x-4">
              <label className="w-[95%]">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Reminder Time  <sup className="text-[#FF6500]">*</sup>
                </p>
                <input
                  required
                  type="time"
                  name="reminderTime"
                  value={eventFormData.reminderTime}
                  onChange={handleEventChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
              <label className="w-[95%]">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  End Date  <sup className="text-[#FF6500]">*</sup>
                </p>
                <input
                  required 
                  type="date"
                  name="end"
                  value={eventFormData.end}
                  onChange={handleEventChange}
                  min={selectedDate}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            </div>

            {/* Description Input */}
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                Description 
              </p>
              <input
                type="text"
                name="description"
                value={eventFormData.description}
                onChange={handleEventChange}
                placeholder="Enter event description"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>

            {/* Recurring and Recurrence Pattern Dropdowns */}
            <div className="flex w-full mx-auto justify-between items-center gap-x-4">
              <label className="w-[90%]">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Recurring <sup className="text-[#FF6500]">*</sup>
                </p>
                <select
                  required
                  name="recurring"
                  value={eventFormData.recurring} 
                  onChange={handleEventChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </label>
              <label className="w-[90%]">
                <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                  Recurrence Pattern <sup className="text-[#FF6500]">*</sup>
                </p>
                <select
                  required
                  disabled={!eventFormData.recurring}
                  name="recurrencePattern"
                  value={eventFormData.recurrencePattern} 
                  onChange={handleEventChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                >
                  <option value="" disabled>Select Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-[#FF6500] text-white py-[8px] px-[12px] font-medium"
            >
              Add Event
            </button>
          </form>
        )}

        {selected === 'meeting' && (
           <form onSubmit={createMeetingHandler} className="flex w-[90%] flex-col gap-y-4 mt-6">
           {/* Title and Location Inputs */}
           <div className="flex w-full mx-auto justify-between items-center gap-x-4">
             <label className='w-[95%]'>
               <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                 Title <sup className="text-[#FF6500]">*</sup>
               </p>
               <input
                 required
                 type="text"
                 name="title"
                 value={meetingFormData.title}
                 onChange={handleMeetingChange}
                 placeholder="Enter event title"
                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />
             </label>
             <label className='w-[95%]'>
               <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                 Location <sup className="text-[#FF6500]">*</sup>
               </p>
               <input
                 required
                 type="text"
                 name="location"
                 value={meetingFormData.location}
                 onChange={handleMeetingChange}
                 placeholder="Enter event location"
                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />
             </label>
           </div>

           {/* Time and Date Inputs */}
           <div className="flex w-full mx-auto justify-between items-center gap-x-4">
             <label className="w-[95%]">
               <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                 Reminder Time <sup className="text-[#FF6500]">*</sup>
               </p>
               <input
                 required
                 type="time"
                 name="reminderTime"
                 value={meetingFormData.reminderTime}
                 onChange={handleMeetingChange}
                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />
             </label>
             <label className="w-[95%]">
               <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
                 End Date  <sup className="text-[#FF6500]">*</sup>
               </p>
               <input
                 required
                 type="date"
                 name="end"
                 value={meetingFormData.end}
                 onChange={handleMeetingChange}
                 min={selectedDate}
                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />
             </label>
           </div>

            {/* Meet link Input */}
            <label className="w-full">
             <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
               Meetlink 
             </p>
             <input
               type="text"
               name="meetingLink"
               value={meetingFormData.meetingLink}
               onChange={handleMeetingChange}
               placeholder="Enter meeting link if any"
               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
             />
           </label>

           {/* Description Input */}
           <label className="w-full">
             <p className="mb-1 text-[0.875rem] text-[#FF6500] leading-[1.375rem] text-richblack-5">
               Description 
             </p>
             <input
               type="text"
               name="description"
               value={meetingFormData.description}
               onChange={handleMeetingChange}
               placeholder="Enter event description"
               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
             />
           </label>

           {/* Submit Button */}
           <button
             type="submit"
             className="mt-6 rounded-[8px] bg-[#FF6500] text-white py-[8px] px-[12px] font-medium"
           >
             Add Meeting
           </button>
         </form>
        )}

      </div>

        )
        }


    </div>
  );
};

export default EventForm;
