import { createContext, useState } from "react";

// Models
import Subject from "../models/Subject";
import Schedule from "../models/Schedule";

import { generateId, getParsedLS } from "../utils/functions";
const AppContext = createContext()

const ContextProvider = ({children}) =>{

    const userInitialValue = {
        userId: generateId('user'),
        userName: "User",
        avatar: "",
        preferences:{
            panelOrder: ["schedule", "tasks", "notes"],
            language: "En"
        }
    }

    // Sates of the app models
    const [subjects, setSubjects] = useState(getParsedLS('subjects') !== null ? getParsedLS('subjects'): new Subject("Subject 1", "1", true).create())
    const [schedule, setSchedule] = useState(getParsedLS('schedule') !== null ? getParsedLS('schedule'): new Schedule('1', '6', '8:00', '10:00').addEvent())
    const [userData, setUserData] = useState(localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : userInitialValue);
    const [notes, setNotes] = useState(localStorage.getItem('notes') !== null ? JSON.parse(localStorage.getItem('notes')) : []) ;
    const [tasks, setTasks] = useState(localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks'))  : []);
    const [events, setEvents] = useState(localStorage.getItem('events') !== null ? JSON.parse(localStorage.getItem('events'))  : []);

    return(
        <AppContext.Provider
            value={{
                userData, setUserData,
                notes, setNotes,
                subjects, setSubjects,
                schedule, setSchedule,
                tasks, setTasks,
                events, setEvents
            }}
        >
            {children}
        </AppContext.Provider>
    )
    
}


export {
    ContextProvider
}

export default AppContext