import { createContext } from "react";

const AppContext = createContext()

const ContextProvider = ({children}) =>{

    const userData = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};
    const notes = localStorage.getItem('notes') !== null ? JSON.parse(localStorage.getItem('notes')) : [] ;
    const subjects = localStorage.getItem('subjects') !== null ? JSON.parse(localStorage.getItem('subjects')) :[] ;
    const tasks = localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks'))  : [];
    const events = localStorage.getItem('events') !== null ? JSON.parse(localStorage.getItem('events'))  : [];

    return(
        <AppContext.Provider
            value={{
                userData,
                notes,
                subjects,
                tasks,
                events
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