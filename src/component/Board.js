import Card from 'react-bootstrap/Card';


export default function Board(props) {


  // props 로 받아와야 하는 변수
  // title, difficulty, Tags, Description, Link

  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
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