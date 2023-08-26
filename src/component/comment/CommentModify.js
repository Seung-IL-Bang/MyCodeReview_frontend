import classes from "./CommentModify.module.css";
import axios from 'axios';
import {useState} from 'react';
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState";


export default function CommentModify(props) {

  const [loginState, setLoginState] = useRecoilState(LoginState);
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


    try {

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
    } catch (e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            putComment();
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
        <button className={classes.button2} onClick={handleCancel}>취소</button>
        <button className={classes.button} onClick={updateComment}>댓글 수정</button>
      </div>
    </div>
  );
}