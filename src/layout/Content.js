import Board from "../component/board/Board";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./Content.module.css"

export default function Content(props) {
  

  const handleFilteringTag = (key) => {
    props.onSetQueryParam(`?types=t&tag=${key}`)
  }

  const handleTotalView = () => {
    props.onSetQueryParam('')
  }

  const tagList = Object.entries(props.tags).map(([key, value]) => (
    <div key={key}>
      <button onClick={() => handleFilteringTag(key)}>{key}</button><span>{value}</span>
    </div>
  ));

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
        <button onClick={handleTotalView}>전체 보기<span>{props.total}</span></button>
        {tagList}
      </Row>
      <Row>
        {boardList}
      </Row>
    </Container>
  );
}
