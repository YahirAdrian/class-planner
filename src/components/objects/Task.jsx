import { Image } from "react-bootstrap"

import editIcon from '../../assets/icons/edit.svg'
import removeIcon from '../../assets/icons/remove.svg'
export default function Task() {
  return (
    <div className='task mb-2 p-2 p-md-3 d-flex align-items-center justify-content-between'>
    
      <div>
        <input className='me-2' type="checkbox" title="Complete task: Task name" id="checkbox-task"/>
        <label htmlFor="checkbox-task" className="mb-0 d-in">Task name</label>
      </div>


      <div className="info d-flex gap-2">
        <div className="d-flex flex-column d-lg-block">
            <span className="task-date text-gray-500 me-2">14/11/2023</span>
            <span className="subject-info text-subject-1">
                <span className="bullet me-2">o</span>
                Subject 1
            </span>
        </div>

        <div className="actions">
            <button type="button" className="bg-transparent border-0 " title="Edit task">
                <Image src={editIcon} width={24} height={24} alt="Edit icon"/>
            </button>
            <button type="button" className="bg-transparent border-0 " title="Remove task">
                <Image src={removeIcon} width={24} height={24} alt="Remove icon"/>
            </button>
        </div>
      </div>

    </div>
  )
}
