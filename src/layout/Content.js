import Board from "../component/Board";

export default function Content(props) {


  const boardList = props.list.map(board =>
     <Board key={`board${board.id}`}
            id={board.id} 
            email={board.email} 
            content={board.content} 
            writer={board.writer} 
            title={board.title} />)
  
  return (
    <ul>
      {boardList}
    </ul>
  );
}
