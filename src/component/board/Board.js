import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import classes from "./Board.module.css";
import SelectedDifficulty from "../write/SelectedDifficulty";

export default function Board(props) {
  
  const navigate = useNavigate();

  const tagList = props.tagList.map((tag, index) => (
    <div key={`tag${index}`}>{tag}</div>
  ));


  const moveToViewPage = () => {
    navigate(`/review/${props.id}`);
  };

  return (
    <Card className={classes.board_card} style={{ width: "18rem" }}>
      <Card.Body onClick={moveToViewPage}>
        <Card.Title className={classes.title}>{props.title}</Card.Title>
        <SelectedDifficulty difficulty={props.difficulty}/>
        <div className={classes.tag_list_wrapper}>
          <div className={classes.tag_list}>{tagList}</div>
        </div>
        <div className={classes.writer}>{'by ' + props.writer}</div>
        <div>
          <img src="/favorite_fill.png" alt="favorite_fill"/>
          <span>{props.likeCount}</span>
        </div>
      </Card.Body>
    </Card>
  );
}
