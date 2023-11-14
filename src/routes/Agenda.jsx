import { Fragment } from "react"
import SubjectBar from "../components/agenda/SubjectBar"
import Notes from "../components/agenda/Notes"
import Tasks from "../components/agenda/Tasks"
import Schedule from "../components/agenda/Schedule"

import '../styles/agenda.css'

export default function Agenda() {
  return (
    <div>
      <div className="heading-box d-flex justify-content-between mt-3">
        <h2>Agenda</h2>
        <button className="btn btn-primary">+ New subject</button>
      </div>

      <div className="d-flex mt-2 h-100">
        <SubjectBar />

        <main className="subject-content bg-white mx-md-3 mx-lg-5 m-3">
          <h3 className="text-subject-1 fs-3">Subject 1</h3>
          <Notes />
          <Tasks />
          <Schedule />
        </main>
      </div>

    </div>
  )
}
