import { Form, Button } from "react-bootstrap"

import { useState } from "react"
import { capitalize } from "../../utils/functions"

export default function SubjectForm({form, action, currentSubject}) {

  const subjects = [1,2,3,4,5,6,7,8]

  const [colorId, setColorId] = useState(form === 'edit' ? currentSubject.colorId : 1)
  const [subjectName,setSubjectName] = useState(form === 'edit' ? currentSubject.name : '')
  return (
    <Form onSubmit={action} method="post">
      <Form.Group>
        <Form.Label>Subject name</Form.Label>
        <Form.Control 
          name="subjectName" 
          placeholder="Name" 
          id="inputSubject" 
          className={`text-subject-${colorId}`}
          value={subjectName}
          onChange={e=> setSubjectName(e.target.value)}
        />
      </Form.Group>

        <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Select 
              name="subjectColorID" 
              value={colorId} 
              onChange={e=>setColorId(e.target.value)} 
              className={`text-subject-${colorId}`}
            >
              {subjects.map(id=>(
                <option key={id} value={id} className={`bg-subject-${id} text-white`}>Color {id}</option>

              ))}
            </Form.Select>
        </Form.Group>


        {form === 'edit' &&(
          <input type="hidden" value={currentSubject.id} readOnly/>
        )}
        
        <div className="d-flex justify-content-end">
          <Button className="mt-4 px-4" type="submit" variant="primary">
              {capitalize(form)}
          </Button>
        </div>
    </Form>

  )
}
