import {useRef, forwardRef, useImperativeHandle, useState } from 'react';
import MarkdownInput from "./MarkdownInput";
import MarkdownSubmit from "./MarkdownSubmit";
import TitleForm from "./TitleForm";
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Write(props) {

  const childTitleRef = useRef();
  const childMarkdownRef = useRef();

  const navigate = useNavigate();

  const handleSubmitBoard = () => {
    // call in MarkdownSubmit

    // title get in TitleForm
    const title = childTitleRef?.current?.getTitle();
  
    // content get in MarkdownInput
    const content = childMarkdownRef?.current?.getContent();

    // axios post method
    const res = uploadToServer(title, content)
    
    // navigate root page
    navigate('/')
  };

  // Authorization, username, email 
  async function uploadToServer(title, content) {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const data = localStorage.getItem('userinfo')
    const userinfo = JSON.parse(data) // JSON -> javascript obj
    const email = userinfo.email
    const writer = userinfo.name

    const formObj = {
      'title' : title,
      'content': content,
      'writer' : writer,
      'email' : email
    }


    const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/auth/board',
        data: JSON.stringify(formObj),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
    });

    return response.data
}

  

  return (
    <div>
      <TitleForm ref={childTitleRef} />
      <MarkdownInput ref={childMarkdownRef} initialValue={" "} />
      <MarkdownSubmit onSaveBoard={handleSubmitBoard}/>
    </div>
  );
}
