import classes from "./CommentModify.module.css";
import axios from 'axios';
import {useState} from 'react';


export default function CommentModify(props) {

  const [enteredComment, setEnteredComment] = useState(props.content);

  const handleComment = (event) => {
    setEnteredComment(event.target.value)
  }

  const updateComment = () => {
    if(enteredComment.length !== 0) {
      putComment()
    }
  }

  const handleCancel = () => {
    props.setIsModified(0);
  }

  const putComment = async () => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const userData = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userData);
    const email = userInfo.email;
    const name = userInfo.name;

    const formObj = {
      'id': props.commentId,
      'content': enteredComment,
      'boardId': props.boardId,
      'memberEmail': email,
      'memberName': name,
      'myComment': true
    }


    await axios({
      method: 'put',
      url: 'http://localhost:8080/auth/comment',
      data: JSON.stringify(formObj),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(res => {
        props.onUpdateComment(props.commentId, formObj)
        props.setIsModified(0);
        setEnteredComment('');
      })
      .catch(e => {
        alert(e.response.data.message);
      })
  }

  return (
    <div>
      <textarea className={classes.textarea} onChange={handleComment} value={enteredComment}></textarea>
      <div className={classes.button_wrapper}>
        <button className={classes.button2} onClick={handleCancel}>취소</button>
        <button className={classes.button} onClick={updateComment}>댓글 수정</button>
      </div>
    </div>
  );
}