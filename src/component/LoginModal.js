import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { LoginState } from '../store/loginState';
import { useNavigate } from 'react-router';


function LoginModal(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [loginState, setLoginState] = useRecoilState(LoginState);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false); 

  const googleLogin = () => {
    window.location = 'http://localhost:8080/oauth2/authorization/google'
  }
  const kakaoLogin = () => {
    window.location = 'http://localhost:8080/oauth2/authorization/kakao'
  }
  
  const logout = () => {
    window.localStorage.clear()
    setLoginState(false)
    // TODO: alert("logout.")
  }

  const write = () => {
    navigate("/write")
  }
  
  return (
    <>
      {loginState && <Button onClick={write} variant="outline-primary">새 글 작성</Button>}
      {loginState ? (
        <Button onClick={logout} className='float-end' variant='secondary'>
          Logout
        </Button>
      ) : (
        <Button className="float-end" variant="primary" onClick={handleShow}>
          Login
        </Button>
      )}
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Social Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={googleLogin} >
            Google Login
          </Button>
        </Modal.Body>
        <Modal.Body>
          <Button variant="primary" onClick={kakaoLogin} >
            Kakao Login
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;