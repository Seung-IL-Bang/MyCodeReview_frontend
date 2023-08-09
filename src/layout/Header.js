import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import Menu from '../component/Menu';

function Header(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">My Code Review</Navbar.Brand>
        <Menu onSetQueryParam={props.onSetQueryParam}/>
      </Container>
    </Navbar>
  );
}

export default Header;