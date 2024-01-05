import { createContext, useState } from "react";

// Models
import Subject from "../models/Subject";

import { 
    notEmptyAndSymbols,
    notEmpty
 } from "../utils/validations";

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

    // Set the initial values (in the constructor of the model updates LS when the object is created)
    


    // Sates of the app models
    const [subjects, setSubjects] = useState(getParsedLS('subjects') !== null ? getParsedLS('subjects'): new Subject("Subject 1", "1", true).create())
    const userData = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : userInitialValue;
    const [notes, setNotes] = useState(localStorage.getItem('notes') !== null ? JSON.parse(localStorage.getItem('notes')) : []) ;
    const [tasks, setTasks] = useState(localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks'))  : []);
    const events = localStorage.getItem('events') !== null ? JSON.parse(localStorage.getItem('events'))  : [];

    const addNote = (e)=>{
        e.preventDefault()
        // Get the data from the form
        const subjectId = e.target[0].value
        const noteTitle = e.target[1].value
        const  noteBody = e.target[2].value
        const today = new Date()


        if(notEmptyAndSymbols(noteTitle) && noteTitle.length > 0 && subjectId.length >0){

            // Create the note object
            const newNote = {
                id: generateId('note'),
                subjectId,
                createdAt: '' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate(),
                title: noteTitle,
                content: noteBody
            }
            localStorage.setItem('notes', JSON.stringify([...notes, newNote]))

            location.reload()
        }else{
            alert('Cannot create the not. Try not using symbols or empty values.')
        }
        
    }


    // Edit functions

    
    const editNote =  e =>{
        e.preventDefault()
        const subjectId = e.target[0].value
        const noteTitle = e.target[1].value
        const noteContent = e.target[2].value

        const noteId = e.target[3].value
        const noteToEdit = notes.filter((note, index) => {
            if(note.id === noteId){
                note.originalIndex = index
                return note
            }
        })[0]

        if(notEmpty(subjectId) && notEmpty(noteTitle) && notEmpty(noteContent)){
            const updatedNote = {
                id: noteId,
                subjectId,
                title: noteTitle,
                content: noteContent,
                createdAt: noteToEdit.createdAt
            }

            notes[noteToEdit.originalIndex] = updatedNote

            localStorage.setItem('notes', JSON.stringify(notes))
            location.reload()
        }else{
            alert('Oops there was a problem while editing the note Try not using symbols or empty values.')
        }
    }

    // Remove functions
    const removeNote = ()=>{

    }

    return(
        <AppContext.Provider
            value={{
                userData,
                notes,
                setNotes,
                subjects,
                setSubjects,
                tasks,
                setTasks,
                events,
                actions:{
                    addNote,
                    removeNote
                }
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