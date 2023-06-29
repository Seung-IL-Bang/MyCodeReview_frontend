import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import LoginModal from '../component/LoginModal';

function Header(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">My Code Review</Navbar.Brand>
        <LoginModal onSetQueryParam={props.onSetQueryParam}/>
      </Container>
    </Navbar>
  );
}

export default Header;