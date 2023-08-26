import axios from "axios";
import { useState } from "react";
import { classes } from './Like.module.css';
import { LoginState } from '../../store/loginState';
import { useRecoilState } from 'recoil';
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";



export default function Like(props) {


    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [loginState, setLoginState] = useRecoilState(LoginState);

    const downLike = async () => {

        const accessToken = localStorage.getItem('accessToken');

        const userData = localStorage.getItem('userinfo');
        const userInfo = JSON.parse(userData);
        const email = userInfo.email;
        const writer = userInfo.name;

        const formObj = {
            'boardId': props.boardId,
            'memberEmail': email
        }

        try {
          await axios({
              method: 'delete',
              url: 'http://localhost:8080/auth/like',
              data: JSON.stringify(formObj),
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`
              },
          }).then(res => {
              setLikeCount((prevState) => prevState - 1)
              setIsLiked((prevState) => !prevState)
          })
        } catch (e) {
          if(e.response.data.message === 'Expired Token') {
            try {
                await callRefresh(); // refreshToken 호출
                console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
                downLike();
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

    const upLike = async () => {

        const accessToken = localStorage.getItem('accessToken');

        const userData = localStorage.getItem('userinfo');
        const userInfo = JSON.parse(userData);
        const email = userInfo.email;
        const writer = userInfo.name;

        const formObj = {
            'boardId': props.boardId,
            'memberEmail': email
        }

        try {
          await axios({
              method: 'post',
              url: 'http://localhost:8080/auth/like',
              data: JSON.stringify(formObj),
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
              },
          }).then(res => {
              setLikeCount((prevState) => prevState + 1)
              setIsLiked((prevState) => !prevState)
          })
        } catch (e) {
          if(e.response.data.message === 'Expired Token') {
            try {
                await callRefresh(); // refreshToken 호출
                console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
                upLike();
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

    const handleLikeChange = () => {


      if(loginState) {
        if(isLiked) {
            downLike()
        } else {
            upLike()
        }
      } else {
        alert("해당 기능은 로그인 이후에 가능합니다.")
      }
    
    }


    return (
        <div>
            {isLiked 
                ? <img src="/favorite_fill.png" alt="favorite_fill" onClick={handleLikeChange}/> 
                : <img src="/favorite.png" alt="favorite" onClick={handleLikeChange}/>
            }
            <div>{likeCount}</div>
        </div>
    );
}