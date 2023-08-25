import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";
import classes from "./Comment.module.css";


export default function Comment(props) {

  return (
    <div>
      <div className={classes.total}>{props.commentsCount}개의 댓글</div>
      <CommentWrite boardId={props.boardId} onAddComment={props.onAddComment}/>
      <CommentList comments={props.comments} boardId={props.boardId} onRemoveComment={props.onRemoveComment} onUpdateComment={props.onUpdateComment}/>
    </div>
  );
}