import classes from "./ReplyWriteEditor.module.css"
import { useState } from 'react';
import axios from 'axios';
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState";

export default function ReplyWriteEditor(props) {

  const [loginState, setLoginState] = useRecoilState(LoginState);
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


    try {
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
    } catch (e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            postReply();
          } catch (refreshErr) {
            alert("로그인 유효기간이 지났습니다.");
            setLoginState(false);
            clearLocalStorage();
            window.location = '/'; // TODO: '/login' 으로 리다이렉팅
          }
      } else { // Malformed jwt, Bad Signature
        alert("잘못된 요청으로 다시 로그인 해주시길 바랍니다.");
        setLoginState(false);
        clearLocalStorage();
        window.location = '/'; // TODO: '/login' 으로 리다이렉팅
      }
    }

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