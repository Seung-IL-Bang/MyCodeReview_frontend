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


export default function Modify(props) {

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
    const refreshToken = localStorage.getItem("refreshToken");

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

    await axios({
      method: "put",
      url: `http://localhost:8080/auth/board/${id}`,
      data: JSON.stringify(formObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {setIsModified(true)})
      .catch(e => alert(e.response.data.message));
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
