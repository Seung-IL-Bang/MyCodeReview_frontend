import TitleForm from "../write/TitleForm";
import MarkdownInput from "../write/MarkdownInput";
import MarkdownModify from "./MarkdownModify";
import Tag from "../write/Tag";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useRef, useState } from "react";
import axios from "axios";
import Link from "../write/Link";
import Difficulty from "../write/Difficulty";
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState";


export default function Modify(props) {

  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [isModified, setIsModified] = useState(false);

  const { id } = useParams();
  const childTitleRef = useRef();
  const childMarkdownRef = useRef();
  const childTagRef = useRef();
  const childLinkRef = useRef();
  const childDifficultyRef = useRef();

  const content = useSelector((state) => state.metaData.content);
  const title = useSelector((state) => state.metaData.title);
  const tagList = useSelector((state) => state.metaData.tagList);
  const link = useSelector((state) => state.metaData.link);
  const difficulty = useSelector((state) => state.metaData.difficulty);

  const handleUpdateBoard = () => {
    const title = childTitleRef?.current?.getTitle();

    const content = childMarkdownRef?.current?.getContent();

    const tagList = childTagRef?.current?.getTagList();

    const link = childLinkRef?.current?.getLink();

    const difficulty = childDifficultyRef?.current?.getDifficulty();

    updateToServer(title, content, tagList, link, difficulty);
  };

  async function updateToServer(title, content, tagList, link, difficulty) {
    const accessToken = localStorage.getItem("accessToken");

    const data = localStorage.getItem("userinfo");
    const userinfo = JSON.parse(data); // JSON -> javascript obj
    const email = userinfo.email;
    const writer = userinfo.name;

    const formObj = {
      title: title,
      content: content,
      tagList: tagList,
      link: link,
      difficulty: difficulty,
      writer: writer,
      email: email,
    };

    try {
      await axios({
        method: "put",
        url: process.env.REACT_APP_SERVER_URL + `/auth/board/${id}`,
        data: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {setIsModified(true)})
    } catch (e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            updateToServer(title, content, tagList, link, difficulty);
          } catch (refreshErr) {
            alert("로그인 유효기간이 지났습니다.");
            setLoginState(false);
            clearLocalStorage();
            window.location = '/'; // TODO: '/login' 으로 리다이렉팅
          }
      } else if (e.response.data.message === 'Malformed Token' || e.response.data.message === 'BadSignatured Token') { // Malformed jwt, Bad Signature
        alert("잘못된 요청으로 다시 로그인 해주시길 바랍니다.");
        setLoginState(false);
        clearLocalStorage();
        window.location = '/'; // TODO: '/login' 으로 리다이렉팅
      } else {
        alert(e.response.data.message)
      }
    }
      
  }

  if(isModified) {
    window.location = `/review/${id}`
  }

  return (
    <>
      <TitleForm ref={childTitleRef} initialValue={title} />
      <Link ref={childLinkRef} initialValue={link}/>
      <Difficulty ref={childDifficultyRef} initialValue={difficulty} initialState={true}/>
      <Tag ref={childTagRef} initialValue={tagList} />
      <MarkdownInput ref={childMarkdownRef} initialValue={content} />
      <MarkdownModify onModifyBoard={handleUpdateBoard} />
    </>
  );
}
