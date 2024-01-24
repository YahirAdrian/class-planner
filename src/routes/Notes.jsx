import { useState } from "react"
import ModalForm from "../components/ModalForm"
import Note from '../components/objects/Note'

import useAgenda from '../hooks/useContext'
import NoteForm from "../components/forms/NoteForm"

import { getParsedLS } from "../utils/functions"

import {default as NoteModel} from "../models/Note"

export default function Calendar() {

  // State for modal
  const [modalShow, setModalShow] = useState(false)
  const [editNotemodalShow, setEditNoteModalShow] = useState(false)

  const[noteToEdit, setNoteToEdit] = useState({})

  const {notes, setNotes} = useAgenda();

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
          action={createNote}
          formType="create"
        />
      </ModalForm>

      <ModalForm
        heading="Edit Note"
        modalShow={editNotemodalShow}
        setModalShow={setEditNoteModalShow}
        >
        <NoteForm
          action={editNote}
          formType="edit"
          subjectId={noteToEdit.subjectId}
          note={noteToEdit}
        />
      </ModalForm>
    </>
  )

  function removeNote(id){
    if(confirm('Are you sure to remove this note? This action cannot be undone')){
      const message = NoteModel.remove(id)
      if(message !== true){
        alert(message)
      }
    
      // Update list
      setNotes(getParsedLS('notes'))
    }
  }

  function createNote(e){
    e.preventDefault()
    // Get the data from the form
    const subjectId = e.target[0].value
    const noteTitle = e.target[1].value
    const noteBody = e.target[2].value

    const message = new NoteModel(subjectId, noteTitle, noteBody).create()

    if(message){
      
      setModalShow(false)
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

    const result  = NoteModel.edit(noteId, subjectId, noteTitle,noteContent)

    if(result){
      setEditNoteModalShow(false)
      setNotes(getParsedLS('notes'))
    }else{
      alert(message)
    }
  }
}
