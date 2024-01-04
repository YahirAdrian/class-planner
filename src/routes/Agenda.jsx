import { useState } from "react"
import { Image } from "react-bootstrap"

import SubjectBar from "../components/agenda/SubjectBar"
import Notes from "../components/agenda/Notes"
import Tasks from "../components/agenda/Tasks"
import ScheduleAgenda from "../components/agenda/ScheduleAgenda"

import ModalForm from '../components/ModalForm'
import NewSubjectForm from "../components/forms/SubjectForm"
import TaskForm from '../components/forms/TaskForm'
import NoteForm from "../components/forms/NoteForm"

import '../styles/agenda.css'
import editIcon from '../assets/icons/edit.svg'
import removeIcon from '../assets/icons/remove.svg'

import useAgenda from '../hooks/useContext'
import SubjectForm from "../components/forms/SubjectForm"

// Models 
import Subject from "../models/Subject"
import { getParsedLS } from "../utils/functions"

export default function Agenda() {

  const {subjects, setSubjects, notes, tasks,
          actions
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
  console.log(subjects[0].id)
  const [currentSubjectId, setCurrentSubjectId] = useState(subjects[0].id !== undefined ? subjects[0].id : '1')
  const currentSubject = subjects.filter(subject => subject.id === currentSubjectId)[0]
  console.log(currentSubjectId)
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
            />
            <Tasks 
              setTaskModalShow={setTaskModalShow}
              setEditTaskModalShow={setEditTaskModalShow}
              tasks={tasksOfSubject}
              setTaskToEdit={setTaskToEdit}
            />
            <ScheduleAgenda
              subject={currentSubject}
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
          action={actions.addTask}
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
          action={actions.editTask}
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
          action={actions.addNote}
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
          action={actions.editNote}
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


}