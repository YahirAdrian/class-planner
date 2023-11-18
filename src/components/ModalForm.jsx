import { Modal, Button } from "react-bootstrap"


export default function ModalForm({children, modalShow, setModalShow, heading, action}) {

  

  return (
    <Modal size="lg" centered show={modalShow} onHide={()=>setModalShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>

        <Modal.Footer>
        <Button variant="outline-danger" onClick={()=> setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={action}>
            Create
          </Button>
        </Modal.Footer>
    </Modal>
  )
}
