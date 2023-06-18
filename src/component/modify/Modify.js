import TitleForm from "../write/TitleForm";
import MarkdownInput from "../write/MarkdownInput";
import MarkdownModify from './MarkdownModify'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useRef } from "react";
import axios from "axios";

export default function Modify(props) {

  const {id} = useParams();
  const navigate = useNavigate();
  const childTitleRef = useRef();
  const childMarkdownRef = useRef();

  const content = useSelector(state => state.metaData.content)
  const title = useSelector(state => state.metaData.title)


  const handleUpdateBoard = () => {
    const title = childTitleRef?.current?.getTitle();
  
    const content = childMarkdownRef?.current?.getContent();

    const res = updateToServer(title, content)
    
    navigate(`/review/${id}`)
  };

  async function updateToServer(title, content) {

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
        method: 'put',
        url: `http://localhost:8080/auth/board/${id}`,
        data: JSON.stringify(formObj),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
    });

    return response.data
}


  return (
    <>
      <TitleForm ref={childTitleRef} initialValue={title}/>
      <MarkdownInput ref={childMarkdownRef} initialValue={content}/>
      <MarkdownModify onModifyBoard={handleUpdateBoard}/>
    </>
  );
}