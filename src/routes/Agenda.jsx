import { useState } from "react"
import { Image } from "react-bootstrap"
import { getParsedLS } from "../utils/functions"

import SubjectBar from "../components/agenda/SubjectBar"
import Notes from "../components/agenda/Notes"
import Tasks from "../components/agenda/Tasks"
import ScheduleAgenda from "../components/agenda/ScheduleAgenda"

import ModalForm from '../components/ModalForm'
import TaskForm from '../components/forms/TaskForm'
import NoteForm from "../components/forms/NoteForm"

import '../styles/agenda.css'
import editIcon from '../assets/icons/edit.svg'
import removeIcon from '../assets/icons/remove.svg'

import useAgenda from '../hooks/useContext'
import SubjectForm from "../components/forms/SubjectForm"

// Models 
import Subject from "../models/Subject"
import Task from "../models/Task"
import Note from "../models/Note"

export default function Agenda() {

  const {subjects, setSubjects, notes, setNotes, tasks, setTasks, schedule
        } = useAgenda()

  // Create states for modal
  const [subjectModalShow, setSubjectModalShow] = useState(false)
  const [editSubjectModalShow, setEditSubjectModalShow] = useState(false)

  const [taskModalShow, setTaskModalShow] = useState(false)
  const [editTaskModalShow, setEditTaskModalShow] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState({})

  const [notetModalShow, setNoteModalShow] = useState(false)
  const [editNoteModalShow, setEditNoteModalShow] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState({})



  // Current subject State
  const [currentSubjectId, setCurrentSubjectId] = useState(subjects[0].id !== undefined ? subjects[0].id : '1')
  const currentSubject = subjects.filter(subject => subject.id === currentSubjectId)[0]
  const tasksOfSubject = tasks.filter(task=> task.subjectId === currentSubject.id)
  const notesOfSubject = notes.filter(note => note.subjectId === currentSubject.id)
  

  const createTaskSubject= ()=>{
    console.log("New task for subject")
  }
  

  return (
    <>
      <div>
        <div className="heading-box d-flex justify-content-between mt-3">
          <h2>Agenda</h2>
          <button className="btn btn-primary" onClick={()=>setSubjectModalShow(true)}>+ New subject</button>
        </div>

        <div className="d-flex mt-2">
          <SubjectBar 
            currentSubjectId={currentSubjectId}
            setCurrentSubjectId={setCurrentSubjectId}
            subjects={subjects}
          />

          <main className="subject-content bg-white mx-md-3 mx-lg-5 m-3">
            <div className="heading-box d-flex justify-content-between ">
              <h3 className={`text-subject-${currentSubject.colorId} fs-3`}>{currentSubject.name}</h3>
              <div>
                <button type="button" className="bg-transparent border-0  me-3" title="Edit subject" onClick={()=> setEditSubjectModalShow(true)}>
                  <Image src={editIcon} width={24} height={24} alt="Edit icon"/>
                </button>
                <button type="button" className="bg-transparent border-0   me-3" title="Remove subject" onClick={()=> removeSubject(currentSubjectId)}>
                  <Image src={removeIcon} width={24} height={24} alt="Remove icon"/>
                </button>
              </div>
            </div>
            <Notes 
              notes={notesOfSubject}
              setNoteModalShow={setNoteModalShow}
              setEditNoteModalShow={setEditNoteModalShow}
              setNoteToEdit={setNoteToEdit}
              removeNote={removeNote}
            />
            <Tasks 
              setTaskModalShow={setTaskModalShow}
              setEditTaskModalShow={setEditTaskModalShow}
              tasks={tasksOfSubject}
              setTaskToEdit={setTaskToEdit}
              removeTask={removeTask}
            />
            <ScheduleAgenda
              subject={currentSubject}
              scheduleAgenda={schedule}
            />
          </main>
        </div>

      </div>

      <ModalForm
        heading="New subject"
        modalShow={subjectModalShow}
        setModalShow={setSubjectModalShow}
      >
        <SubjectForm
          form={'create'}
          action={createSubject}
        />
      </ModalForm>

      <ModalForm
        heading="Edit subject"
        modalShow={editSubjectModalShow}
        setModalShow={setEditSubjectModalShow}
      >
        <SubjectForm 
          form={'edit'}
          currentSubject={currentSubject}
          action={editSubject}
        />
      </ModalForm>

      <ModalForm
        heading="New task"
        action={createTaskSubject}
        modalShow={taskModalShow}
        setModalShow={setTaskModalShow}
      >
        <TaskForm 
          action={createTask}
          subjectId={currentSubjectId}
          formType="create"
        />
      </ModalForm>

      <ModalForm
        heading="Edit task"
        modalShow={editTaskModalShow}
        setModalShow={setEditTaskModalShow}
      >
        <TaskForm 
          action={editTask}
          subjectId={currentSubjectId}
          task={taskToEdit}
          formType="edit"
        />
      </ModalForm>

      <ModalForm
        heading="New note"
        modalShow={notetModalShow}
        setModalShow={setNoteModalShow}
      >
        <NoteForm
          action={createNote}
          subjectId={currentSubjectId}
          formType="create"
        />
      </ModalForm>

      <ModalForm
        heading="Edit note"
        modalShow={editNoteModalShow}
        setModalShow={setEditNoteModalShow}
      >
        <NoteForm
          action={editNote}
          subjectId={currentSubjectId}
          formType="edit"
          note={noteToEdit}
        />
      </ModalForm>
    </>
  )
  // Subject actions
  function createSubject(e){
    e.preventDefault()
    
    const subjectName = e.target[0].value
    const colorId = e.target[1].value
  
    new Subject(subjectName, colorId).create()
  
    setSubjects(getParsedLS('subjects'))
    setSubjectModalShow(false)
  
  }

  function editSubject(e){
    e.preventDefault()

    const newName = e.target[0].value
    const newColorId = e.target[1].value
    const subjectId = e.target[2].value

    Subject.edit(subjectId, newName, newColorId)

    setSubjects(getParsedLS('subjects'))
    setEditSubjectModalShow(false)
  }

  
  function removeSubject(id){
    if(confirm('Are you sure to delete this subject? With this action all subjects, notes, and schedule associated to this subject will be removed. This action cannot be undone.')){
      const message = Subject.remove(id)
      if(message !== true){
        alert(message)
      }
    
      // Update list
      setSubjects(getParsedLS('subjects'))
      setCurrentSubjectId(subjects[0].id)
    }
  }

  function createTask(e){
    e.preventDefault()

    const subjectId = e.target[0].value
    const taskName = e.target[1].value
    const deadline = e.target[2].value
    const important = e.target[3].value === 'true' ? true : false //Convert from string to boolean

   new Task(taskName, subjectId, deadline, important).create()

   setTasks(getParsedLS('tasks'))
   setTaskModalShow(false)
   setCurrentSubjectId(subjectId)
   
  }

  function editTask(e){
    e.preventDefault()
    const subjectId = e.target[0].value
    const taskName = e.target[1].value
    const taskDue = e.target[2].value
    const taskImportance = e.target[3].value === 'true' ? true : false
    const taskId = e.target[4].value

    const result = Task.edit(taskId, subjectId, taskName, taskDue, taskImportance)

    if(result){
      setTasks(getParsedLS('tasks'))
      setEditTaskModalShow(false)
      setCurrentSubjectId(subjectId)
    }else{
      alert(result)
    }
  }

  function removeTask(id){
    if(confirm('Are you sure to remove this task? This action cannot be undone')){
      const message = Task.remove(id)
      if(message !== true){
        alert(message)
      }
    
      // Update list
      setTasks(getParsedLS('tasks'))
    }
  }

  function createNote(e){
    e.preventDefault()
    // Get the data from the form
    const subjectId = e.target[0].value
    const noteTitle = e.target[1].value
    const noteBody = e.target[2].value

    const message = new Note(subjectId, noteTitle, noteBody).create()

    if(message){
      
      setCurrentSubjectId(subjectId)
      setNoteModalShow(false)
      setNotes(getParsedLS('notes'))
    }else{
      alert(message)
    }
  }

  function editNote(e){
    e.preventDefault()
    const subjectId = e.target[0].value
    const noteTitle = e.target[1].value
    const noteContent = e.target[2].value
    const noteId = e.target[3].value

    const result  = Note.edit(noteId, subjectId, noteTitle,noteContent)

    if(result){
      setEditNoteModalShow(false)
      setCurrentSubjectId(subjectId)
      setNotes(getParsedLS('notes'))
    }else{
      alert(message)
    }
  }

  function removeNote(id){
    if(confirm('Are you sure to remove this note? This action cannot be undone')){
      const message = Note.remove(id)
      if(message !== true){
        alert(message)
      }
    
      // Update list
      setNotes(getParsedLS('notes'))
    }
  }
}