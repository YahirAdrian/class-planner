import { Form } from "react-bootstrap"

export default function NewSubjectForm() {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Subject name</Form.Label>
        <Form.Control placeholder="Name"/>
      </Form.Group>

        <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Select>
                <option value="1" className="bg-subject-1 text-white">Color 1</option>
                <option value="2" className="bg-subject-2 text-white">Color 2</option>
                <option value="3" className="bg-subject-3 text-white">Color 3</option>
                <option value="4" className="bg-subject-4 text-white">Color 4</option>
                <option value="5" className="bg-subject-5 text-white">Color 5</option>
                <option value="6" className="bg-subject-6 text-white">Color 6</option>
                <option value="7" className="bg-subject-7 text-white">Color 7</option>
                <option value="8" className="bg-subject-8 text-white">Color 8</option>
            </Form.Select>
        </Form.Group>

        
    </Form>
  )
}
