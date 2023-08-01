import {useRef, useState } from 'react';
import MarkdownInput from "./MarkdownInput";
import MarkdownSubmit from "./MarkdownSubmit";
import TitleForm from "./TitleForm";
import axios from 'axios';
import Tag from './Tag';
import Link from './Link';
import Difficulty from './Difficulty';

export default function Write(props) {

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


    await axios({
        method: 'post',
        url: 'http://localhost:8080/auth/board',
        data: JSON.stringify(formObj),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
      })
      .then(response => {setIsSubmitted(true)})
      .catch(e => {alert(e.response.data.message)});
}

  if(isSubmitted) {
    // navigate root page
    window.location = '/'
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
