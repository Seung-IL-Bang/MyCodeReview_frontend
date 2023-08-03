import Board from "../component/board/Board";
import Option from "../component/options/Option";
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
    <div key={key} onClick={() => handleFilteringTag(key)}>
      <div>{key}<span>{` (${value})`}</span></div>
    </div>
  ));

  const boardList = props.list.map((board) => (
    <Col key={`board${board.id}`} xs={12} sm={6} md={4} lg={3}>
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
      {props.total && 
        <div id="total" className={classes.tag_list}>
          <div key={'전체 보기'} onClick={handleTotalView}>
            <div>전체 보기<span>{` (${props.total})`}</span></div>
          </div>
          {tagList}
        </div>
      }
      <Option onSetQueryParam={props.onSetQueryParam}/>
      <Row className={classes.board_list}>
        {boardList}
      </Row>
    </Container>
  );
}
