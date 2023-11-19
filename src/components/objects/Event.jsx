import { Image } from 'react-bootstrap'

import editIcon from '../../assets/icons/edit.svg'
import removeIcon from '../../assets/icons/remove.svg'

export default function Event({setEditEventModalShow, setViewEventModalShow, removeEvent}) {
  return (
    <div className='schedule-item text-dark bg-gray-100 mb-3 d-flex p-3 justify-content-between align-items-center'>
      

      <p className="subject-name mb-0">Event title</p>
      <div className='me-xl-5 d-flex flex-column flex-md-row align-items-center'>
        <span className='mb-2 mb-md-0 text-gray-700'> 7:00 - 9:00</span>

        <div className="actions d-flex gap-1 ms-md-2">

            <button type="button" className="btn-link text-primary" title='View event' onClick={()=>setViewEventModalShow(true)}>
                View
            </button>
            <button type="button" className="bg-transparent btn-link" title='Edit event' onClick={()=>setEditEventModalShow(true)}>
                <Image width={24} height={24} src={editIcon} alt='Edit icon'/>
            </button>
            <button type="button" className="bg-transparent btn-link" title='Remove event' onClick={removeEvent}>
                <Image width={24} height={24} src={removeIcon} alt='Edit icon'/>
            </button>
        </div>
      </div>
    </div>
  )
}
