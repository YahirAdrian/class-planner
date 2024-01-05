import { Link } from "react-router-dom"
import Task from "../objects/Task"

export default function Tasks({ setTaskModalShow, setEditTaskModalShow,setTaskToEdit, tasks, removeTask }) {


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
        {
          tasks.map(task => (
            <Task 
              key={task.id}
              task={task}
              setEditTaskModalShow={setEditTaskModalShow}
              setTaskToEdit={setTaskToEdit}
              removeTask={removeTask}
            />
          ))
        }

        { tasks.length <=0 ?
          <div className="bg-gray-100 d-flex align-items-center justify-content-center ">
            <p className="fw-bold fs-3 p-5">No tasks yet. Start creating a new one.</p>
          </div>
          : ''
        }
      </div>
    </section>
  )
}
