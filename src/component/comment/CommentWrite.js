import { useState } from 'react';
import classes from './CommentWrite.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CommentWrite(props) {
  
  const [enteredComment, setEnteredComment] = useState('');

  const handleComment = (event) => {
    setEnteredComment(event.target.value)
  }

  const submitComment = () => {
    if(enteredComment.length !== 0) {
      postComment()
    }
  }
  

  const postComment = async () => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const userData = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userData);

    if (userInfo === null) {
      alert("댓글을 작성하려면 로그인해야 합니다.")
      return;
    }

    const email = userInfo.email
    const name = userInfo.name;

    const formObj = {
      'content': enteredComment,
      'boardId': props.boardId,
      'memberEmail': email
    }


    await axios({
      method: 'post',
      url: 'http://localhost:8080/auth/comment',
      data: JSON.stringify(formObj),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(res => {
        const newComment = new Array(Object.assign(formObj, {'id': res.data.id, 'memberName': name, 'myComment': true}))
        props.onAddComment(newComment);
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
        <button className={classes.button} onClick={submitComment}>댓글 작성</button>
      </div>
    </div>
  );
}
