import TitleForm from "../write/TitleForm";
import MarkdownInput from "../write/MarkdownInput";
import MarkdownModify from "./MarkdownModify";
import Tag from "../write/Tag";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useRef, useState } from "react";
import axios from "axios";

export default function Modify(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const childTitleRef = useRef();
  const childMarkdownRef = useRef();
  const childTagRef = useRef();

  const content = useSelector((state) => state.metaData.content);
  const title = useSelector((state) => state.metaData.title);
  const tagList = useSelector((state) => state.metaData.tagList);

  const handleUpdateBoard = () => {
    const title = childTitleRef?.current?.getTitle();

    const content = childMarkdownRef?.current?.getContent();

    const tagList = childTagRef?.current?.getTagList();

    const res = updateToServer(title, content, tagList);

    navigate(`/review/${id}`);
  };

  async function updateToServer(title, content, tagList) {
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
      writer: writer,
      email: email,
    };

    const response = await axios({
      method: "put",
      url: `http://localhost:8080/auth/board/${id}`,
      data: JSON.stringify(formObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  return (
    <>
      <TitleForm ref={childTitleRef} initialValue={title} />
      <Tag ref={childTagRef} initialValue={tagList} />
      <MarkdownInput ref={childMarkdownRef} initialValue={content} />
      <MarkdownModify onModifyBoard={handleUpdateBoard} />
    </>
  );
}
