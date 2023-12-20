import { createContext } from "react";

const AppContext = createContext()

const ContextProvider = ({children}) =>{


    return(
        <AppContext.Provider
            value={{
                data: "Hellao world"
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