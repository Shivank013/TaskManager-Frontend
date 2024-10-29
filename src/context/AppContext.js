import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider ({children}) {

    const [events, setEvents] = useState([]);

    const [selectedDate, setSelectedDate] = useState("");
    const [addevent, setAddevent] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selecteEvent , setSelecteEvent] = useState(null);


    const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
      const savedToken = localStorage.getItem("token");
      return savedToken ? JSON.parse(savedToken) : null;
    });



    const value = {
        token, setToken,
        user, setUser,
        selectedDate, setSelectedDate,
        addevent, setAddevent,
        events, setEvents,
        calendarEvents, setCalendarEvents,
        selecteEvent , setSelecteEvent
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}