import Board from "../component/board/Board";
import { Container, Row, Col } from "react-bootstrap";

export default function Content(props) {
  

  const boardList = props.list.map((board) => (
    <Col key={`board${board.id}`} md={3} >
      <Board
        id={board.id}
        email={board.email}
        content={board.content}
        writer={board.writer}
        title={board.title}
      />
    </Col>
  ));
  
  return (
    <Container>
      <Row>
        {boardList}
      </Row>
    </Container>
  );
}
