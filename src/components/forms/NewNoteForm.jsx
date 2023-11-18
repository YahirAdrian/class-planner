import { Form } from "react-bootstrap"

export default function NewNoteForm() {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Subejct</Form.Label>
        <Form.Select>
            <option className="text-subject-1" value="1">Subject 1</option>
            <option className="text-subject-2" value="2">Subject 2</option>
            <option className="text-subject-3" value="3">Subject 3</option>
            <option className="text-subject-4" value="4">Subject 4</option>
            <option className="text-subject-5" value="5">Subject 5</option>
            <option className="text-subject-6" value="6">Subject 6</option>
            <option className="text-subject-7" value="7">Subject 7</option>
            <option className="text-subject-8" value="8">Subject 8</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="Note title" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Note</Form.Label>
        <Form.Control as="textarea" placeholder="Note..."/>
      </Form.Group>
    </Form>
  )
}
