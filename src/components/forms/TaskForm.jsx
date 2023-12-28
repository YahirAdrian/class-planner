
import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'
import useAgenda from '../../hooks/useContext'

import { capitalize } from '../../utils/functions'

export default function TaskForm({formType, action, subjectId, task}) {

  const {subjects} = useAgenda()
  const [currentSubjectId, setCurrentSubjectId] = useState(subjectId !== undefined ? subjectId : '1')
  
  // Task info only edit mode
  const [taskName, setTaskName] = useState(task !== undefined ? task.name : '')
  const [taskDeadline, setTaskDeadline] = useState(task !== undefined ? task.deadline : '')
  const [important, setImportant] = useState(task !== undefined ? task.important: false)
  
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
        <Form.Control type='text' placeholder='Task' value={taskName} onChange={e => setTaskName(e.target.value)}/>
        </Form.Group>

        <Form.Group className='mb-3'>
        <Form.Label>Due date <span className="text-gray-500">(optional)</span></Form.Label>
        <Form.Control type='date' value={taskDeadline} onChange={e => setTaskDeadline(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Check type='switch' label='Important' value={important} state={String(important)} onChange={e=> setImportant(!important)}/>
        </Form.Group>

        {formType === 'edit' && (
          <input type='hidden' value={task.id} readOnly/>
        )}

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">{capitalize(formType)} Task</Button>
        </div>
    </Form>
  )
}
