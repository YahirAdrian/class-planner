import { useState } from "react"
import ModalForm from "../components/ModalForm"
import Note from '../components/objects/Note'
import NewTaskForm from "../components/forms/NewTaskForm"
import NewNoteForm from "../components/forms/NewNoteForm"

export default function Calendar() {

  // State for modal
  const [modalShow, setModalShow] = useState(false)
  const [editNotemodalShow, setEditNoteModalShow] = useState(false)

  const addNewNote =  ()=>{
    console.log("New note")
  }

  const editNote = ()=>{
    console.log("Edit Note")
  }
  const removeNote = ()=>{
    confirm("Are you sure to delete this note?")
  }

  return (
    <>
      <div className="heading-box d-flex justify-content-between mb-4 mt-2">
        <h2>Notes</h2>
        <button type="button" className="btn btn-primary" onClick={()=> setModalShow(true)}> + New note</button>
      </div>
      <div className="mt-3 notes-box d-flex flex-wrap gap-2 justify-content-evenly">

        <Note
          setEditNoteModalShow={setEditNoteModalShow}
          removeNote={removeNote}
        />
        <Note
          setEditNoteModalShow={setEditNoteModalShow}
          removeNote={removeNote}
        />
        <Note
          setEditNoteModalShow={setEditNoteModalShow}
          removeNote={removeNote}
        />
        <Note
          setEditNoteModalShow={setEditNoteModalShow}
          removeNote={removeNote}
        />
      </div>
      
      <ModalForm
        heading="Edit note"
        action={editNote}
        modalShow={editNotemodalShow}
        setModalShow={setEditNoteModalShow}
      >
        <NewNoteForm />
      </ModalForm>
    </>
  )
}
