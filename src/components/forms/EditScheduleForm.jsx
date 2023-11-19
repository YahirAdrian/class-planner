import { Form } from "react-bootstrap"

export default function EditScheduleForm() {
  return (
    <Form> 
        <Form.Group>
            <h3>Monday</h3>
            <div className='d-flex align-items-center gap-2'>
            <Form.Control type="time"/>
            <span>-</span>
            <Form.Control type="time"/>
            </div>
        </Form.Group>
        <div className="d-flex justify-content-end mt-3">
            <button className='btn btn-link me-2' type='button'>Add schedule day</button>
            <button type="button" className="btn btn-danger text-white btn-sm me-2">Clear schedule</button>
        </div>
    </Form>
  )
}
