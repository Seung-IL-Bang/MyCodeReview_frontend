import classes from "./ReplyModify.module.css"
import axios from "axios";
import {useState} from 'react';

export default function ReplyModify(props) {

  const [enteredReply, setEnteredReply] = useState(props.content);

  const handleReply = (event) => {
    setEnteredReply(event.target.value)
  }

  const updateReply = () => {
    if(enteredReply.length !== 0) {
      putReply()
    }
  }

  const handleCancel = () => {
    props.setIsModified(0);
  }

  const putReply = async () => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const userData = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userData);
    const email = userInfo.email;
    const name = userInfo.name;

    const formObj = {
      'id': props.replyId,
      'commentId': props.commentId,
      'content': enteredReply,
      'memberEmail': email,
      'memberName': name,
      'myReply': true
    }


    await axios({
      method: 'put',
      url: 'http://localhost:8080/auth/reply',
      data: JSON.stringify(formObj),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(res => {
        props.onUpdateReply(props.replyId, formObj)
        props.setIsModified(0);
        setEnteredReply('');
      })
      .catch(e => {
        alert(e.response.data.message);
      })
  }


  return (
    <div>
      <textarea className={classes.textarea} onChange={handleReply} value={enteredReply}></textarea>
      <div className={classes.button_wrapper}>
        <button className={classes.button2} onClick={handleCancel}>취소</button>
        <button className={classes.button} onClick={updateReply}>답글 수정</button>
      </div>
  </div>
  )
}