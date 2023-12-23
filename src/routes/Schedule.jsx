import { useState } from 'react'
import { Image, Form } from 'react-bootstrap'

import editIcon from '../assets/icons/edit.svg'

import ScheduleAgenda from '../components/agenda/ScheduleAgenda'
import Event from '../components/objects/Event'
import SubjectSelect from '../components/SubjectSelect'
import ModalForm from '../components/ModalForm'
import NewEventForm from '../components/forms/NewEventForm'
import EditScheduleForm from '../components/forms/EditScheduleForm'

import useAgenda from '../hooks/useContext'
import { daysOfTheWeekEnglish } from '../utils/constants'

export default function Schedule() {
  const [modalScheduleShow, setModalScheduleShow] = useState(false)

  const [modalEventShow, setModalEventShow] = useState(false)
  const [editEventModalShow, setEditEventModalShow] = useState(false)
  const [viewEventModalShow, setViewEventModalShow] = useState(false)

  const {subjects, events} = useAgenda()

  const [currentSubjectId, setCurrentSubjectId] = useState("1")
  const currentSubject = subjects.filter(subject => subject.id === currentSubjectId)[0]
  const arrangedEvents = orderEventsByDate(events)
  // Get the schedule for every day of the week

  const createEvent = ()=>{
    console.log("Event created")
  }

  const editEvent = () =>{
    console.log("Edit event")
  }

  const removeEvent = ()=>{
    confirm("Are you sure to remove this item?")
  }

  const viewEvent = ()=>{

  }

  const editSchedule = ()=>{
    console.log("Schedule changed sucessfully")
  }


  return (
    <>
      <div className='heading-box d-flex justify-content-between mb-4'>
        <h2>Schedule</h2>

        <SubjectSelect
          currentSubject={currentSubject}
          currentSubjectId={currentSubjectId}
          setCurrentSubjectId={setCurrentSubjectId}
        />
      </div>

      <section className='section-box'>
        <div className="heading-box d-flex justify-content-between mb-3">
          <h3 className='text-subject-1'>Subject 1</h3>
          <button type="button" className='btn-link bg-transparent  ' title='Edit schedule for subject 1' onClick={()=> setModalScheduleShow(true)}>
            <Image width={24} height={24} src={editIcon} alt='Edit icon' />
          </button>
        </div>

        <ScheduleAgenda
          subject={currentSubject}
        />
      </section>

      <section className='section-box'>
        <div className="heading-box d-flex justify-content-between mb-4">
          <h3>Events</h3>
          <button type="button" className="btn-link" onClick={()=> setModalEventShow(true)}>+ Add event</button>
        </div>

        <p className='text-gray-700'>Past events are removed automatically</p>

        {arrangedEvents.map(event=>(
          <Event 
            key={event.id}
            setEditEventModalShow={setEditEventModalShow}
            removeEvent={removeEvent}
            setViewEventModalShow={setViewEventModalShow}
            event={event}
          />

        ))}
        
      </section>

      {/* Modal from to create and edit event */}
      <ModalForm 
        heading={"Create event"}
        action={createEvent}
        modalShow={modalEventShow}
        setModalShow={setModalEventShow}
      >
        <NewEventForm />
      </ModalForm>

      <ModalForm 
        heading={"Edit event"}
        action={editEvent}
        modalShow={editEventModalShow}
        setModalShow={setEditEventModalShow}
      >
        <NewEventForm />
      </ModalForm>

      <ModalForm 
        heading={"Event title"}
        action={viewEvent}
        modalShow={viewEventModalShow}
        setModalShow={setViewEventModalShow}
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos veritatis, nobis nesciunt cumque natus reiciendis culpa quis esse eligendi, nostrum perferendis maiores aspernatur doloribus aperiam in enim ratione doloremque laudantium?|</p>
        <p><span className='text-gray-500'>Date:</span> 12/12/2023</p>
        <p><span className='text-gray-500'>Time:</span> <span>10:00 - 12:00</span></p>
        <p className='text-danger'>! Important</p>
      </ModalForm>

      {/* Modal form to edit the schedule */}

      <ModalForm
        heading="Edit schedule for subject 1"
        action={editSchedule}
        modalShow={modalScheduleShow}
        setModalShow={setModalScheduleShow}>
          <EditScheduleForm />
      </ModalForm>
    </>
  )
}


function orderEventsByDate(events){
  // Filter the schedule only for the ones of this day
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return events
}
