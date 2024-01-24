import { Form } from "react-bootstrap"
import { capitalize } from "../../utils/functions"
import { useState } from "react"

export default function NewEventForm({formType, action, event}) {

  // States declaration for events
  const [name, setName] = useState(event !== undefined ? event.title : '')
  const [description, setDescription] = useState(event !== undefined ? event.description : '')
  const [date, setDate] = useState(event !== undefined ? event.date : '')
  const [timeStart, setTimeStart] = useState(event !== undefined ? event.timeStart : '')
  const [timeEnd, setTimeEnd] = useState(event !== undefined ? event.timeEnd : '')
  const [important, setImportant] = useState(event !== undefined ? event.important : false)

  return (
    <Form onSubmit={action}>

        <Form.Group className='mb-3'>
          <Form.Label>Event name</Form.Label>
          <Form.Control type='text' placeholder='Name'
            value={name}
            onChange={e=> setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Event description</Form.Label>
          <Form.Control as='textarea' placeholder='Description'
            value={description}
            onChange={e=> setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Due date</Form.Label>
          <Form.Control type='date'
            value={date}
            onChange={e=> setDate(e.target.value)}
          />
        </Form.Group>

        <div className="row mb-3">
          <div className="col-6">
            <Form.Group>
              <Form.Label>Time Start</Form.Label>
              <Form.Control type="time"
                value={timeStart}
                onChange={e=> setTimeStart(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group>
              <Form.Label>Time End</Form.Label>
              <Form.Control type="time"
                value={timeEnd}
                onChange={e=> setTimeEnd(e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
        <Form.Group className='mb-3'>
          <Form.Check type='switch' label="Important"
            defaultValue={important}
            onChange={()=> setImportant(!important)}
          />
        </Form.Group>

        {event &&(

          <input type="hidden" value={event.id} readOnly />
        )}

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary ">
            {capitalize(formType)} Event
          </button>
        </div>
    </Form>
  )
}
