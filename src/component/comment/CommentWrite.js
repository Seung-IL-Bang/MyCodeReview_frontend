import { useState } from 'react';
import classes from './CommentWrite.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { callRefresh, clearLocalStorage } from '../../util/LoginUtil';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../store/loginState';

export default function CommentWrite(props) {
  
  const [loginState, setLoginState] = useRecoilState(LoginState);
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


    try {
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
    } catch (e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            postComment();
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
      <textarea className={classes.textarea} onChange={handleComment} value={enteredComment}></textarea>
      <div className={classes.button_wrapper}>
        <button className={classes.button} onClick={submitComment}>댓글 작성</button>
      </div>
    </div>
  );
}
