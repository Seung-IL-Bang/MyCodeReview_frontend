import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import classes from './Board.module.css'


export default function Board(props) {

  const navigate = useNavigate()

  const moveToViewPage = () => {
    navigate(`/review/${props.id}`)
  }

  // props 로 받아와야 하는 변수
  // title, difficulty, Tags, Description, Link

  
  return (
    <Card className={classes.board_card} style={{ width: '18rem' }}>
      <Card.Body onClick={moveToViewPage}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">difficulty</Card.Subtitle>
        <Card.Text>
          Tags
        </Card.Text>
        <Card.Text>
          Description
        </Card.Text>
        <Card.Link href="#">Problem Link</Card.Link>
      </Card.Body>
    </Card>
  );
}