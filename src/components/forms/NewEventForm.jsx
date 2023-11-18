import { Form } from "react-bootstrap"

export default function NewEventForm() {
  return (
    <Form>

        <Form.Group className='mb-3'>
        <Form.Label>Event name</Form.Label>
        <Form.Control type='text' placeholder='Name'/>
        </Form.Group>

        <Form.Group className='mb-3'>
        <Form.Label>Event description</Form.Label>
        <Form.Control as='textarea' placeholder='Description'/>
        
        </Form.Group>

        <Form.Group className='mb-3'>
        <Form.Label>Due date</Form.Label>
        <Form.Control type='date'/>
        </Form.Group>
        <Form.Group className='mb-3'>
        <Form.Check type='switch' label="Important"/>
        </Form.Group>
    </Form>
  )
}
