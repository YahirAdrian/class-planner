
import { Button, Form } from "react-bootstrap"
import useAgenda from "../../hooks/useContext"
import { useState } from "react"
import { capitalize } from "../../utils/functions"

export default function NoteForm({formType, note, action, subjectId}) {
  const {subjects} = useAgenda()
  const [currentSubjectId, setCurrentSubjectId] = useState(subjectId !== undefined ? subjectId: '1')
  const [noteTitle, setNoteTitle] = useState(note !== undefined ? note.title : '')
  const [noteBody, setNoteBody] = useState(note !== undefined ? note.content : '')
  
  const subjectColorId = subjects.filter(subject=>(subject.id===currentSubjectId))[0].colorId;
  return (
    <Form onSubmit={action}>
      <Form.Group>
        <Form.Label>Subject</Form.Label>
        <Form.Select value={currentSubjectId} onChange={e=>setCurrentSubjectId(e.target.value)} className={`text-subject-${subjectColorId}`}>
          {
            subjects.map(subject =>(
              <option key={subject.id} className={`text-subject-${subject.colorId}`} value={subject.id}>{subject.name}</option>

            ))
          }
            
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="Note title" value={noteTitle} onChange={e=> setNoteTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Note</Form.Label>
        <Form.Control as="textarea" placeholder="Note..." rows="8" value={noteBody} onChange={e=>setNoteBody(e.target.value)}/>
      </Form.Group>

      {formType === 'edit' && (
        <input type="hidden" value={note.id} readOnly />
      )}
      <div className="d-flex justify-content-end">
        <Button className="mt-4 " type="submit" variant="primary">
            {capitalize(formType) + ' Note'}
        </Button>
      </div>
    </Form>
  )
}
