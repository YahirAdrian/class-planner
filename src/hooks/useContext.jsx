import { useContext } from "react";
import AppContext from "../context/ContextProvider";

const useAgenda = ()=>{
    return useContext(AppContext)
}

export default useAgenda