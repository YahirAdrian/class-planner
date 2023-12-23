import { useState } from "react";
import { Image } from "react-bootstrap"

import editIcon from '../../assets/icons/edit.svg'
import removeIcon from '../../assets/icons/remove.svg'
import useAgenda from "../../hooks/useContext";
export default function Task({setEditTaskModalShow, removeTask, task}) {

  const {id, name, subjectId, deadline, important, completed} = task;
  const [checked, setChecked] = useState(completed)
  const {subjects} = useAgenda();
  const subjectName = subjects.filter(subject => subject.id === subjectId)[0].name


  const completeTask = taskId =>{
    setChecked(!checked)

    // Update the state of the task in localStorage
  }
  return (
    <div className='task mb-3 p-2 p-md-3 d-flex align-items-center justify-content-between' data-id={id}>
    
      <div>
        <input className='me-2' type="checkbox" title={`Complete task: ${name}`} id={`checkbox-task-${id}`} checked={checked} onChange={()=> completeTask(id)}/>
        <label htmlFor={`checkbox-task-${id}`} className="mb-0 d-in">{name}</label>
      </div>


      <div className="info d-flex gap-2">
        <div className="d-flex flex-column d-lg-block">
            <span className="task-date text-gray-500 me-2">{deadline}</span>
            <span className="subject-info text-subject-1">
              {
                important == true && <span className="mx-2 fw-bold text-danger">!</span>
              }
              
              <span className={`text-subject-${subjectId}`}>
                <span className="bullet me-2">o</span>
                {subjectName}
                </span>
            </span>
        </div>

        <div className="actions">
            <button type="button" className="bg-transparent border-0 " title="Edit task" onClick={()=> setEditTaskModalShow(true)}>
                <Image src={editIcon} width={24} height={24} alt="Edit icon"/>
            </button>
            <button type="button" className="bg-transparent border-0 " title="Remove task" onClick={removeTask}>
                <Image src={removeIcon} width={24} height={24} alt="Remove icon"/>
            </button>
        </div>
      </div>

    </div>
  )
}
