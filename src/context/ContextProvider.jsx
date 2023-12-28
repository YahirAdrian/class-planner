import { createContext } from "react";

import { 
    notEmptyAndSymbols,
    notEmpty
 } from "../utils/validations";

 import { generateId } from "../utils/functions";
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

    const subjectInitialValue = [
        {
            id: '1',
            subjectId: '1',
            name: 'Subject 1',
            colorId: '1',
            schedule: []
        }    
    ]

    const userData = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : userInitialValue;
    const notes = localStorage.getItem('notes') !== null ? JSON.parse(localStorage.getItem('notes')) : [] ;
    const subjects = localStorage.getItem('subjects') !== null ? JSON.parse(localStorage.getItem('subjects')) : subjectInitialValue ;
    const tasks = localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks'))  : [];
    const events = localStorage.getItem('events') !== null ? JSON.parse(localStorage.getItem('events'))  : [];


    // Functions to create new object instances
    const addSubject=(subjectName, colorId)=>{
        // Validate the subject Id and color
        if(notEmptyAndSymbols(subjectName) && !isNaN(colorId)){ //Validate subjectName and ColorId
            const newSubject = {
                id: generateId('subject'),
                name: subjectName,
                colorId: colorId,
                schedule: []
            }

            // Update localStorage
            const newSubjects = [...subjects, newSubject]
            localStorage.setItem('subjects', JSON.stringify(newSubjects))

            location.reload()
        }else{
            alert('Cannot create the subject. Try not using symbols or empty values.')
        }
    }

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
    
    const addTask = e =>{
        console.log('task')
        e.preventDefault()
        // Get the data from the form
        const subjectId = e.target[0].value
        const taskName = e.target[1].value
        const deadline = e.target[2].value
        const important = e.target[3].value === 'true' ? true : false //Convert from string to boolean
        
        if(notEmpty(taskName)){
            // Create the task object
            const newTask = {
                id: generateId('task'),
                subjectId,
                name: taskName,
                deadline,
                important,
                completed: false
            }

            
            // Add the task to localstorage and then reload
            localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
            location.reload()
        
        }else{
            alert('Cannot create the task. Try not using symbols or empty values.')
        }

    }


    // Edit functions

    const editSubject = e=>{
        e.preventDefault()

        const newName = e.target[0].value
        const newColorId = e.target[1].value
        const subjectId = e.target[2].value
        let subjectIndex = 0;
        const subjectToEdit = subjects.filter((subject, index) => {
            if(subject.id === subjectId){
                subject.originalIndex = index
                return subject
            }
        })[0]
        // Validate the subject Id and color
        if(notEmpty(newName) && subjectToEdit.id !== undefined && !isNaN(newColorId)){ //Validate subjectName and ColorId
            
            // Replace the values
            const updatedSubject = {
                id: subjectToEdit.id,
                name: newName,
                colorId: newColorId,
                schedule: subjectToEdit.schedule
            }

            // Update the subject in the array
            subjects[subjectToEdit.originalIndex] = updatedSubject

            localStorage.setItem('subjects', JSON.stringify(subjects))
            location.reload()
        }else{
            alert('Oops there was a problem while editing the subject Try not using symbols or empty values.')
        }
    }

    const editTask = e =>{
        e.preventDefault()
        const subjectId = e.target[0].value
        const taskName = e.target[1].value
        const taskDue = e.target[2].value
        const taskImportance = e.target[3].value === 'true' ? true : false
        const taskId = e.target[4].value
        let originalIndex

        const taskToEdit = tasks.filter((task, index) => {
            if(task.id === taskId){
                originalIndex = index
                return task
            }
        })[0]

        if(notEmpty(subjectId) && notEmpty(taskName) && notEmpty(taskDue) && notEmpty(taskId)){
            const updatedTask = {
                id: taskToEdit.id,
                subjectId,
                name: taskName,
                deadline: taskDue,
                important: taskImportance,
                completed: taskToEdit.completed
            }

            tasks[originalIndex] = updatedTask
            localStorage.setItem('tasks', JSON.stringify(tasks))
            location.reload()
        }else{
            alert('Oops there was a problem while editing the task Try not using symbols or empty values.')
        }
    }

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

    const removeSubject = subjectId =>{
        const subjectToRemove = subjects.filter(subject => (subject.id === subjectId))[0]

        if(subjectToRemove !== undefined){
            if(confirm('Are you sure to delete this subject? With this action all subjects, notes, and schedule associated to this subject will be removed. This action cannot be undone.')){
                // Delete the subject
                const newSubjects = subjects.filter(subject => (subject !== subjectId))
                localStorage.setItem('subjects', JSON.stringify(newSubjects))
                location.reload()
            }
        }
    }

    return(
        <AppContext.Provider
            value={{
                userData,
                notes,
                subjects,
                tasks,
                events,
                actions:{
                    addSubject,
                    addNote,
                    addTask,
                    editSubject,
                    editNote,
                    editTask,
                    removeSubject,
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