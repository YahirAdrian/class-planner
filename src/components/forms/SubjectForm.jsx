import { Form, Button } from "react-bootstrap"

import { useState } from "react"

export default function SubjectForm({action}) {

  const subjects = [1,2,3,4,5,6,7,8]

  const [colorId, setColorId] = useState(1)
  
  return (
    <Form onSubmit={action} method="post">
      <Form.Group>
        <Form.Label>Subject name</Form.Label>
        <Form.Control name="subjectName" placeholder="Name" id="inputSubject" className={`text-subject-${colorId}`}/>
      </Form.Group>

        <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Select name="subjectColorID" value={colorId} onChange={e=>setColorId(e.target.value)} className={`text-subject-${colorId}`}>
              {subjects.map(id=>(
                <option key={id} value={id} className={`bg-subject-${id} text-white`}>Color {id}</option>

              ))}
            </Form.Select>
        </Form.Group>


        
        <div className="d-flex justify-content-end">
          <Button className="mt-4 " type="submit" variant="primary">
              Create
          </Button>
        </div>
    </Form>

  )
}
