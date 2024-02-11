import { createContext, useState } from "react";

// Models
import Subject from "../models/Subject";
import Schedule from "../models/Schedule";

import { generateId, getParsedLS, updateLS } from "../utils/functions";
import Task from "../models/Task";
import moment from "moment";
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

    const [userInfo, setUserInfo] = useState(getParsedLS('user-info') !== null ? getParsedLS('user-info') : userInitialValue)

    const [subjects, setSubjects] = useState(getParsedLS('subjects') !== null ? getParsedLS('subjects'): new Subject("Subject 1", "1", true).create())
    const [schedule, setSchedule] = useState(getParsedLS('schedule') !== null ? getParsedLS('schedule'): new Schedule('1', '6', '08:00', '10:00').addEvent())
    const [notes, setNotes] = useState(localStorage.getItem('notes') !== null ? JSON.parse(localStorage.getItem('notes')) : []) ;
    const [tasks, setTasks] = useState(localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks'))  : []);
    const [events, setEvents] = useState(localStorage.getItem('events') !== null ? JSON.parse(localStorage.getItem('events'))  : []);

    updateLS('tasks', tasks)
    updateLS('notes', notes)
    updateLS('user-info', userInfo)
    updateLS('events', events)

    return(
        <AppContext.Provider
            value={{
                userInfo, setUserInfo,
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