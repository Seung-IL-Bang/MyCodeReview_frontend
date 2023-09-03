import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRecoilState } from 'recoil';
import { LoginState } from '../store/loginState';
import { useNavigate } from 'react-router';
import Search from './search/Search';


function Menu(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [loginState, setLoginState] = useRecoilState(LoginState);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false); 

  const googleLogin = () => {
    window.location = process.env.REACT_APP_SERVER_URL + '/oauth2/authorization/google'
  }
  const kakaoLogin = () => {
    window.location = process.env.REACT_APP_SERVER_URL + '/oauth2/authorization/kakao'
  }
  
  const logout = () => {
    window.localStorage.clear()
    setLoginState(false)
    // TODO: alert("logout.")
    navigate("/")
  }

  const myReviews = () => {
    navigate("/myhome")
  }

  const write = () => {
    navigate("/write")
  }
  
  const myFavorites = () => {
    navigate("/lists/liked")
  }
  
  return (
    <>
      <Search onSetQueryParam={props.onSetQueryParam}/>
      {loginState && <Button onClick={write} variant="outline-primary">새 글 작성</Button>}
      {loginState ? (
        <DropdownButton id="dropdown-basic-button" title="Menu">
          <Dropdown.Item onClick={myReviews}>My Reviews</Dropdown.Item>
          <Dropdown.Item onClick={myFavorites}>My Favorites</Dropdown.Item>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </DropdownButton>
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

export default Menu;