import { useState } from "react"
import ModalForm from "../components/ModalForm"
import Note from '../components/objects/Note'

import useAgenda from '../hooks/useContext'
import NoteForm from "../components/forms/NoteForm"

export default function Calendar() {

  // State for modal
  const [modalShow, setModalShow] = useState(false)
  const [editNotemodalShow, setEditNoteModalShow] = useState(false)

  const[noteToEdit, setNoteToEdit] = useState({})

  const {notes, actions} = useAgenda();

  const removeNote = ()=>{
    confirm("Are you sure to delete this note?")
  }

  return (
    <>
      <div className="heading-box d-flex justify-content-between mb-4 mt-2 p-3">
        <h2>Notes</h2>
        <button type="button" className="btn btn-primary" onClick={()=> setModalShow(true)}> + New note</button>
      </div>
      <div className="mt-3 notes-box d-flex flex-wrap gap-2 justify-content-evenly">

        {notes.map(note=>(
          <Note
            key={note.id}
            setEditNoteModalShow={setEditNoteModalShow}
            setNoteToEdit={setNoteToEdit}
            removeNote={removeNote}
            note={note}
          />

        ))}
        
      </div>
      
      <ModalForm
        heading="New Note"
        modalShow={modalShow}
        setModalShow={setModalShow}
        >
        <NoteForm
          action={actions.addNote}
          formType="create"
        />
      </ModalForm>

      <ModalForm
        heading="Edit Note"
        modalShow={editNotemodalShow}
        setModalShow={setEditNoteModalShow}
        >
        <NoteForm
          action={actions.editNote}
          formType="edit"
          subjectId={noteToEdit.subjectId}
          note={noteToEdit}
        />
      </ModalForm>
    </>
  )
}
