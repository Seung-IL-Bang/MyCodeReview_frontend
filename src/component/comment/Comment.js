import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";


export default function Comment(props) {

  return (
    <div>
      <CommentWrite boardId={props.boardId} onAddComment={props.onAddComment}/>
      <CommentList comments={props.comments} boardId={props.boardId} onRemoveComment={props.onRemoveComment} onUpdateComment={props.onUpdateComment}/>
    </div>
  );
}