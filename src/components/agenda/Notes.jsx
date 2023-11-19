import { Link } from "react-router-dom"
import Note from "../objects/Note"

export default function Notes({setNoteModalShow}) {
  return (
    <section className="section-box mx-0 ">
        <div className="heading-box d-flex justify-content-between ">
            <h3>Notes</h3>
            <button type='button' className='btn-link' onClick={()=> setNoteModalShow(true)}>+ New note</button>
        </div>

        <div className="mt-3 notes-box d-flex flex-wrap gap-2 justify-content-evenly">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
    </section>
  )
}
