import { useState } from "react"
import { Image } from "react-bootstrap"

import SubjectBar from "../components/agenda/SubjectBar"
import Notes from "../components/agenda/Notes"
import Tasks from "../components/agenda/Tasks"
import ScheduleAgenda from "../components/agenda/ScheduleAgenda"

import ModalForm from '../components/ModalForm'
import NewSubjectForm from "../components/forms/NewSubjectForm"
import NewTaskForm from '../components/forms/NewTaskForm'
import NewNoteForm from "../components/forms/NewNoteForm"

import '../styles/agenda.css'
import editIcon from '../assets/icons/edit.svg'
import removeIcon from '../assets/icons/remove.svg'

import useAgenda from '../hooks/useContext'

export default function Agenda() {

  const {subjects, notes, tasks} = useAgenda()


  // Create states for modal
  const [subjectModalShow, setSubjectModalShow] = useState(false)
  const [editSubjectModalShow, setEditSubjectModalShow] = useState(false)

  const [tasktModalShow, setTaskModalShow] = useState(false)
  const [notetModalShow, setNoteModalShow] = useState(false)

  // Current subject State
  const [currentSubjectId, setCurrentSubjectId] = useState("1")
  const currentSubject = subjects.filter(subject => subject.id === currentSubjectId)[0]

  const tasksOfSubject = tasks.filter(task=> task.subjectId === currentSubject.id)
  const notesOfSubject = notes.filter(note => note.subjectId === currentSubject.id)

  //Actions when modal forms are submitted
  const createSubject = ()=>{
    console.log("New Subject")
  }
  
  const editSubject = ()=>{
    console.log("Edit Subject")

  }

  const removeSubject = ()=>{
    confirm("Are you sure you want to remove this subject?")
  }

  const createTaskSubject = ()=>{
    console.log("New task for subject")
  }

  const editTaskSubject = ()=>{
    console.log("Edit task for subject")
  }

  const createNoteSubject = ()=>{
    console.log("New note for subject")
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
              <h3 className={`text-subject-${currentSubject.id} fs-3`}>{currentSubject.name}</h3>
              <div>
                <button type="button" className="bg-transparent border-0  me-3" title="Edit subject" onClick={()=> setEditSubjectModalShow(true)}>
                  <Image src={editIcon} width={24} height={24} alt="Edit icon"/>
                </button>
                <button type="button" className="bg-transparent border-0   me-3" title="Remove subject" onClick={()=> removeSubject()}>
                  <Image src={removeIcon} width={24} height={24} alt="Edit icon"/>
                </button>
              </div>
            </div>
            <Notes 
              setNoteModalShow={setNoteModalShow}
              notes={notesOfSubject}
            />
            <Tasks 
              setTaskModalShow={setTaskModalShow}
              tasks={tasksOfSubject}
            />
            <ScheduleAgenda
              subject={currentSubject}
            />
          </main>
        </div>

      </div>

      <ModalForm
        heading="New subject"
        action={createSubject}
        modalShow={subjectModalShow}
        setModalShow={setSubjectModalShow}
      >
        <NewSubjectForm />
      </ModalForm>

      <ModalForm
        heading="Edit subject"
        action={editSubject}
        modalShow={editSubjectModalShow}
        setModalShow={setEditSubjectModalShow}
      >
        <NewSubjectForm />
      </ModalForm>

      <ModalForm
        heading="New task"
        action={createTaskSubject}
        modalShow={tasktModalShow}
        setModalShow={setTaskModalShow}
      >
        <NewTaskForm />
      </ModalForm>

      <ModalForm
        heading="New note"
        action={createNoteSubject}
        modalShow={notetModalShow}
        setModalShow={setNoteModalShow}
      >
        <NewNoteForm />
      </ModalForm>
    </>
  )
}
