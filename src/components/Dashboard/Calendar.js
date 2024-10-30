import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventForm from "./EventForm";
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import './calander.css';
import { getUserDetails } from "../../operations/useroperations";

export default function CalendarPage() {
    const { setSelectedDate, addevent, setSelecteEvent, setAddevent, calendarEvents, setCalendarEvents } = useContext(AppContext);

    useEffect(() => {
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
  
        if (calendarEvents.length === 0) {
            fetchUserDetails();
        }
    }, [setCalendarEvents, calendarEvents.length]);

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setAddevent(true);
    };

    const handleEventClick = (info) => {
        console.log("info:",info)
        console.log("calander events:",calendarEvents)
        const event = info.event;
        console.log("Event:", event);
        console.log("Event ID:", event.id); 
        console.log("Extended Props:", event.extendedProps); 
        setSelecteEvent(event);  
        setAddevent(true);    
    };

    return (
        <div className="h-full">
            {addevent && <EventForm />}
            <h1 className="h-[7%] flex items-start font-ramabhadra text-2xl w-full font-semibold">
                Welcome back, let&apos;s dive in!
            </h1>
            <div className="h-[93%] w-full flex flex-col pr-10 pb-[3vh] justify-center items-center">
                <div className="h-full w-full">
                   
                        <div className="h-[100%] w-[100%] flex flex-col justify-start items-center">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                events={calendarEvents}
                                dateClick={handleDateClick}
                                eventClick={handleEventClick}
                                selectable={true}
                                editable={true}
                                height="100%"
                                width="80vw"
                            />
                        </div>
                    
                </div>
            </div>
        </div>
    );
}
