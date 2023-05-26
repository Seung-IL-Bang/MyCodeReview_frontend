import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="float-end" variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Social Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={handleClose}>
            Google Login
          </Button>
        </Modal.Body>
        <Modal.Body>
          <Button variant="primary" onClick={handleClose}>
            Kakao Login
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;