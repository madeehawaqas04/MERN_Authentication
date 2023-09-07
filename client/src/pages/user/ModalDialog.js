import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDialog({ message, onDialog, name }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary"  onClick={() => onDialog(false)}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message} + 'user' +{name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={() => onDialog(true)} >
          {/* onClick={handleClose} */}
            Yes
          </Button>
          <Button variant="primary"  onClick={() => onDialog(false)}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDialog;
