import { useState } from "react"

import SubjectBar from "../components/agenda/SubjectBar"
import Notes from "../components/agenda/Notes"
import Tasks from "../components/agenda/Tasks"
import Schedule from "../components/agenda/Schedule"

import ModalForm from '../components/ModalForm'
import NewSubjectForm from "../components/forms/NewSubjectForm"
import NewTaskForm from '../components/forms/NewTaskForm'
import NewNoteForm from "../components/forms/NewNoteForm"

import '../styles/agenda.css'

export default function Agenda() {

  // Create states for modal
  const [subjectModalShow, setSubjectModalShow] = useState(false)
  const [notetModalShow, setNoteModalShow] = useState(false)
  const [tasktModalShow, setTaskModalShow] = useState(false)

  //Actions when modal forms are submitted
  const createSubject = ()=>{
    console.log("New Subject")
  }

  const createTaskSubject = ()=>{
    console.log("New task for subject")
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
          <SubjectBar />

          <main className="subject-content bg-white mx-md-3 mx-lg-5 m-3">
            <h3 className="text-subject-1 fs-3">Subject 1</h3>
            <Notes 
              setNoteModalShow={setNoteModalShow}
            />
            <Tasks 
              setTaskModalShow={setTaskModalShow}
            />
            <Schedule />
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
