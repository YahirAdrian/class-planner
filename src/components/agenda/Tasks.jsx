import { Link } from "react-router-dom"
import Task from "../objects/Task"

export default function Tasks({ setTaskModalShow }) {
  return (
    <section className='section-box mx-0'>
      <div className="heading-box d-flex justify-content-between">
        <h3>Tasks</h3>
        {setTaskModalShow ?
          <button type='button' className='btn-link' onClick={()=> setTaskModalShow(true)}>+ New Task</button>
          :
          <Link to='/tasks'>
            <button type='button' className='btn-link'>+ New Task</button>
          </Link>
        }
      </div>

      <div className="tasks-box mt-3  ">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </section>
  )
}
