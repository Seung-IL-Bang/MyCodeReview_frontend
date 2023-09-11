import { useState } from "react";
import ReplyWrite from "./ReplyWrite";
import ReplyList from "./ReplyList";


export default function Reply(props) {

  const [repliesCount, setRepliesCount] = useState(props.repliesCount)
  const [replies, setReplies] = useState(props.replies);

  const addReply = (newReply) => {
    if(!replies) { // replies 가 0개인 경우 -> undefiend
      setReplies(Array(newReply))
    } else {
      const newReplies = replies.concat(newReply);
      setReplies(newReplies);
    }
    setRepliesCount((prev) => prev + 1);
  }

  const removeReply = (replyId) => {
    const index = replies.findIndex(reply => reply.id === replyId);
    replies.splice(index, 1);
    setRepliesCount((prev) => prev - 1);
    setReplies(replies);
  }

  const updateReply = (replyId, newReply) => {
    const index = replies.findIndex(reply => reply.id === replyId);
    replies.splice(index, 1, newReply);
    setReplies(replies);
  }

  return (
    <div>
      {repliesCount >= 1 
      ? <ReplyList replies={replies} repliesCount={repliesCount} onUpdateReply={updateReply} onRemoveReply={removeReply} onAddReply={addReply} boardId={props.boardId} commentId={props.commentId}/> 
      : <ReplyWrite onAddReply={addReply} commentId={props.commentId} /> }
    </div>
  );
}