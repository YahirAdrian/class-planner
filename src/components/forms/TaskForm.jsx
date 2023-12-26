
import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'
import useAgenda from '../../hooks/useContext'

export default function TaskForm({action, subjectId}) {

  const {subjects} = useAgenda()
  const [currentSubjectId, setCurrentSubjectId] = useState(subjectId !== undefined ? subjectId : '1')
  const [important, setImportant] = useState(false)

  const subjectColor = subjects.filter(subject => (subject.id === currentSubjectId))[0].colorId

  return ( 
    <Form onSubmit={action}>
        <Form.Group className='mb-3'>
        <Form.Label>Subject</Form.Label>
        <Form.Select className={`text-subject-${subjectColor}`} value={currentSubjectId} onChange={e=> setCurrentSubjectId(e.target.value)}>
          {subjects.map(subject=>(

            <option key={subject.id} className={`text-subject-${subject.colorId}`} value={subject.id}>{subject.name}</option>

          ))}
        </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
        <Form.Label>Task name</Form.Label>
        <Form.Control type='text' placeholder='Task'/>
        </Form.Group>

        <Form.Group className='mb-3'>
        <Form.Label>Due date <span className="text-gray-500">(optional)</span></Form.Label>
        <Form.Control type='date'/>
        </Form.Group>

        <Form.Group>
          <Form.Check type='switch' label='Important' value={important} state={String(important)} onChange={e=> setImportant(!important)}/>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">Create note</Button>
        </div>
    </Form>
  )
}
