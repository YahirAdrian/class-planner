import { Image } from 'react-bootstrap'

import editIcon from '../../assets/icons/edit.svg'
import removeIcon from '../../assets/icons/remove.svg'

export default function Note({setEditNoteModalShow, removeNote}) {
  return (
    <div className='note p-2 bg-subject-1'>
      <div className='d-flex justify-content-between '>
        <p className='fs-5 fw-bold '>Title</p>
        <div>
        {setEditNoteModalShow && 
        
          <button type="button" className="bg-transparent border-0 " title="Edit task" onClick={()=> setEditNoteModalShow(true)}>
            <Image src={editIcon} width={24} height={24} alt="Edit icon"/>
          </button>
        }

        {removeNote && 
        
          <button type="button" className="bg-transparent border-0 " title="Remove task" onClick={removeNote}>
            <Image src={removeIcon} width={24} height={24} alt="Remove icon"/>
          </button>
        }
        </div>
      </div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque voluptatem nobis cum obcaecati veritatis sunt minus aliquid hic.</p>
      <span className="date">14/11/2023</span>
    </div>
  )
}
