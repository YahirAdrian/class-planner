import { useState } from 'react'
import { Image, Form } from 'react-bootstrap'


import ScheduleAgenda from '../components/agenda/ScheduleAgenda'
import Event from '../components/objects/Event'
import SubjectSelect from '../components/SubjectSelect'
import ModalForm from '../components/ModalForm'
import NewEventForm from '../components/forms/NewEventForm'
import EditScheduleForm from '../components/forms/EditScheduleForm'

import useAgenda from '../hooks/useContext'

import {default as EventModel} from '../models/Event'

import { daysOfTheWeekEnglish } from '../utils/constants'
import { notEmpty, validTimeOrEmpty } from '../utils/validations'
import { getParsedLS } from '../utils/functions'

export default function Schedule() {
  const [modalScheduleShow, setModalScheduleShow] = useState(false)

  const [modalEventShow, setModalEventShow] = useState(false)
  const [editEventModalShow, setEditEventModalShow] = useState(false)
  const [viewEventModalShow, setViewEventModalShow] = useState(false)

  const [currentEvent, setCurrentEvent] = useState({})

  const {subjects, setSubjects, events, setEvents} = useAgenda()

  const [currentSubjectId, setCurrentSubjectId] = useState("1")
  const currentSubject = subjects.filter(subject => subject.id === currentSubjectId)[0]
  const arrangedEvents = orderEventsByDate(events)
  // Get the schedule for every day of the week


  const editSchedule = ()=>{
    console.log("Schedule changed sucessfully")
  }


  return (
    <>
      <div className='heading-box d-flex justify-content-between mb-4 p-3'>
        <h2>Schedule</h2>

        <SubjectSelect
          currentSubject={currentSubject}
          currentSubjectId={currentSubjectId}
          setCurrentSubjectId={setCurrentSubjectId}
        />
      </div>

      <section className='section-box'>
        <div className="heading-box d-flex justify-content-between mb-3">
          <h3 className={`text-subject-${currentSubject.colorId}`}>{currentSubject.name}</h3>
        </div>

        <ScheduleAgenda
          subject={currentSubject}
          setModalScheduleShow={setModalScheduleShow}
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
            setCurrentEvent={setCurrentEvent}
            event={event}
          />

        ))}
        
      </section>

      {/* Modal from to create and edit event */}
      <ModalForm 
        heading={"Create event"}
        modalShow={modalEventShow}
        setModalShow={setModalEventShow}
      >
        <NewEventForm
          formType="create"
          action={createEvent}
        />
      </ModalForm>

      <ModalForm 
        heading={"Edit event"}
        modalShow={editEventModalShow}
        setModalShow={setEditEventModalShow}
      >
        <NewEventForm
          formType="edit"
          action={editEvent}
          event={currentEvent}
        />
      </ModalForm>

      <ModalForm 
        heading={currentEvent.title}
        modalShow={viewEventModalShow}
        setModalShow={setViewEventModalShow}
      >
        <p>{currentEvent.description}</p>
        <p><span className='text-gray-500'>Date:</span> {currentEvent.date}</p>
        <p><span className='text-gray-500'>Time:</span> <span>{currentEvent.timeStart} - {currentEvent.timeEnd}</span></p>
        <p className='text-danger'>
          {currentEvent.important === true ? '! Important' : ''}
        </p>
      </ModalForm>

      {/* Modal form to edit the schedule */}

      <ModalForm
        heading="Edit schedule for subject 1"
        action={editSchedule}
        modalShow={modalScheduleShow}
        setModalShow={setModalScheduleShow}>
          <EditScheduleForm 
            currentSubject={currentSubject}
          />
      </ModalForm>
    </>
  )

  // Event crud actions
  function createEvent(e){
    e.preventDefault()

    const name = e.target[0].value
    const description = e.target[1].value
    const date = e.target[2].value
    const timeStart = e.target[3].value
    const timeEnd = e.target[4].value
    const important = e.target[5].value === 'true' ? true : false //Convert from string to boolean

    const message = new EventModel(name, date, description, timeStart, timeEnd, important).create()
    if(message){

      setModalEventShow(false)
      setEvents(getParsedLS('events'))
    }else{
      alert(message)
    }
  }

  function editEvent(e){
    e.preventDefault()
    const title = e.target[0].value
    const description = e.target[1].value
    const date = e.target[2].value
    const timeStart = e.target[3].value
    const timeEnd = e.target[4].value
    const important = e.target[5].value === 'true' ? true : false //Convert from string to boolean}

    const id = e.target[6].value

    const result = EventModel.edit(id, title, description, date, timeStart, timeEnd, important)
    
    if(result){
      setEditEventModalShow(false)
      setEvents(getParsedLS('events'))
    }else{
      alert(result)
    }

  }

  function removeEvent(id){
    if(confirm('Are you sure to remove this event? This action cannot be undone.')){

      const result = EventModel.remove(id)
      if(result){
        setEvents(getParsedLS('events'))
      }else{
        alert(result)
      }
    }
  }
}


function orderEventsByDate(events){
  // Filter the schedule only for the ones of this day
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return events
}
