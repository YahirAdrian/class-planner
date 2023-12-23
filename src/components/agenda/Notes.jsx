import { Link } from "react-router-dom"
import Note from "../objects/Note"

export default function Notes({setNoteModalShow, notes}) {


  return (
    <section className="section-box mx-0 ">
        <div className="heading-box d-flex justify-content-between ">
            <h3>Notes</h3>
            <button type='button' className='btn-link' onClick={()=> setNoteModalShow(true)}>+ New note</button>
        </div>

        <div className="mt-3 notes-box d-flex flex-wrap gap-2 justify-content-evenly">
          {notes.length >0 ?
            notes.map(note=>(
              <Note
                key={note.id}
                note={note}
              />
            ))
          :
          <div className="bg-gray-100 d-flex justify-content-center align-items-center p-5 rounded ">
            <p className="fw-bold fs-2">There aren't any notes yet. Start creating a new one.</p>
          </div>
          }
        </div>
    </section>
  )
}
