import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function LoginModal() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false); 

  const googleLogin = () => {
    window.location = 'http://localhost:8080/oauth2/authorization/google'
  }
  const kakaoLogin = () => {
    window.location = 'http://localhost:8080/oauth2/authorization/kakao'
  }
  

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
          <Button variant="primary" onClick={googleLogin}>
            Google Login
          </Button>
        </Modal.Body>
        <Modal.Body>
          <Button variant="primary" onClick={kakaoLogin}>
            Kakao Login
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;