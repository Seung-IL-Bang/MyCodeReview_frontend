import classes from "./ReplyWriteEditor.module.css"
import { useState } from 'react';
import axios from 'axios';

export default function ReplyWriteEditor(props) {

  const [enteredReply, setEnteredReply] = useState('');

  const handleReply = (event) => {
    setEnteredReply(event.target.value)
  }

  const submitReply = () => {
    if(enteredReply.length !== 0) {
      postReply()
    }
  }
  

  const postReply = async () => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const userData = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userData);

    if (userInfo === null) {
      alert("답글을 작성하려면 로그인해야 합니다.")
      return;
    }

    const email = userInfo.email
    const name = userInfo.name;

    const formObj = {
      'content': enteredReply,
      'commentId': props.commentId,
      'memberEmail': email
    }


    await axios({
      method: 'post',
      url: 'http://localhost:8080/auth/reply',
      data: JSON.stringify(formObj),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(res => {
        const newReply = new Array(Object.assign(formObj, {'id': res.data.id, 'memberName': name, 'myReply': true}))
        props.onAddReply(newReply);
        setEnteredReply('');
      })
      .catch(e => {
        alert(e.response.data.message);
      })
  }


  return (
    <div>
      <div className={classes.textarea_wrapper}>
        <textarea className={classes.textarea} onChange={handleReply} value={enteredReply}></textarea>
        <div className={classes.button_wrapper}>
          <button className={classes.button2} onClick={() => props.onSetShow(prev => !prev)}>취소</button>
          <button className={classes.button} onClick={submitReply}>답글 작성</button>
        </div>
      </div>
  </div>
  )
}