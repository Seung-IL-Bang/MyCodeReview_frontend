import {useRef, useState } from 'react';
import MarkdownInput from "./MarkdownInput";
import MarkdownSubmit from "./MarkdownSubmit";
import TitleForm from "./TitleForm";
import axios from 'axios';
import Tag from './Tag';
import Link from './Link';
import Difficulty from './Difficulty';
import { callRefresh, clearLocalStorage } from '../../util/LoginUtil';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../store/loginState';

export default function Write(props) {

  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const childTitleRef = useRef();
  const childMarkdownRef = useRef();
  const childTagRef = useRef();
  const childLinkRef = useRef();
  const childDifficultyRef = useRef();

  const handleSubmitBoard = () => {
    // call in MarkdownSubmit

    // title get in TitleForm
    const title = childTitleRef?.current?.getTitle();
  
    // content get in MarkdownInput
    const content = childMarkdownRef?.current?.getContent();

    const tagList = childTagRef?.current?.getTagList();

    const link = childLinkRef?.current?.getLink();

    const difficulty = childDifficultyRef?.current?.getDifficulty();

    // axios post method
    uploadToServer(title, content, tagList, link, difficulty)
  };

  // Authorization, username, email 
  async function uploadToServer(title, content, tagList, link, difficulty) {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const data = localStorage.getItem('userinfo')
    const userinfo = JSON.parse(data) // JSON -> javascript obj
    const email = userinfo.email
    const writer = userinfo.name

    const formObj = {
      'title' : title,
      'content': content,
      'tagList': tagList,
      'link': link,
      'difficulty': difficulty,
      'writer' : writer,
      'email' : email
    }

    try {
      await axios({
          method: 'post',
          url: process.env.REACT_APP_SERVER_URL + '/auth/board',
          data: JSON.stringify(formObj),
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${accessToken}`
          }
        })
        .then(response => {setIsSubmitted(true)})
    } catch (e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            uploadToServer(title, content, tagList, link, difficulty);
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

  if(isSubmitted) {
    // navigate myhome page
    window.location = '/myhome'
  }

  
  return (
    <div>
      <TitleForm ref={childTitleRef} />
      <Link ref={childLinkRef} initialValue={''}/>
      <Difficulty ref={childDifficultyRef} initialState={false}/>
      <Tag ref={childTagRef} initialValue={[]}/>
      <MarkdownInput ref={childMarkdownRef} initialValue={""} />
      <MarkdownSubmit onSaveBoard={handleSubmitBoard}/>
    </div>
  );
}
