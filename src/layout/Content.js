import Board from "../component/board/Board";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./Content.module.css"

export default function Content(props) {
  

  const boardList = props.list.map((board) => (
    <Col key={`board${board.id}`} >
      <Board
        id={board.id}
        email={board.email}
        content={board.content}
        tagList={board.tagList}
        difficulty={board.difficulty}
        writer={board.writer}
        title={board.title}
      />
    </Col>
  ));
  
  return (
    <Container className={classes.container}>
      <Row>
        {boardList}
      </Row>
    </Container>
  );
}
