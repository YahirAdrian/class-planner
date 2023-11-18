import { useState } from "react"
import ModalForm from "../components/ModalForm"
import Notes from "../components/agenda/Notes"
import NewTaskForm from "../components/forms/NewTaskForm"
import NewNoteForm from "../components/forms/NewNoteForm"

export default function Calendar() {

  // State for modal
  const [modalShow, setModalShow] = useState(false)

  const addNewNote =  ()=>{
    console.log("New note")
  }

  return (
    <>
      <div className="heading-box d-flex justify-content-between mb-4 mt-2">
        <h2>Notes</h2>
        <button type="button" className="btn btn-primary" onClick={()=> setModalShow(true)}> + New note</button>
      </div>

      <Notes
      />

      <ModalForm
        heading="Create note"
        action={addNewNote}
        modalShow={modalShow}
        setModalShow={setModalShow}
      >
        <NewNoteForm />
      </ModalForm>
    </>
  )
}
