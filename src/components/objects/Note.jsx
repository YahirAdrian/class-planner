import { Image } from 'react-bootstrap'

import editIcon from '../../assets/icons/edit.svg'
import removeIcon from '../../assets/icons/remove.svg'
import useAgenda from '../../hooks/useContext';

export default function Note({setEditNoteModalShow, removeNote, note}) {

  const {id, title, content, createdAt, subjectId} = note;

  const {subjects} = useAgenda()
  const noteColor = subjects.filter(subject => (subject.id === subjectId))[0].colorId

  return (
    <div className={`note p-2 bg-subject-${noteColor}`}>
      <div className='d-flex justify-content-between '>
        <p className='fs-5 fw-bold '>{title}</p>
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
      <p>{content}</p>
      <span className="date">{createdAt}</span>
    </div>
  )
}
