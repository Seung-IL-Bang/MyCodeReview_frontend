import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import TitleForm from "../write/TitleForm";
import Tag from "../write/Tag";
import Link from "../write/Link";
import Difficulty from "../write/Difficulty";
import MarkdownInput from "../write/MarkdownInput";
import SubTitleForm from "../write/SubTitleForm";
import MarkdownModify from "./MarkdownModify";
import { useParams } from "react-router";


export default function SubModify(props) {

    const [isModified, setIsModified] = useState(false);
    
    const { id } = useParams(); // subReviewId
    const childMarkdownRef = useRef();
    const childSubTitleRef = useRef();

    const title = useSelector((state) => state.metaData.title);
    const tagList = useSelector((state) => state.metaData.tagList);
    const link = useSelector((state) => state.metaData.link);
    const difficulty = useSelector((state) => state.metaData.difficulty);
    const subTitle = useSelector((state) => state.subReview.title)
    const subContent = useSelector((state) => state.subReview.content)

    const handleUpdateSubReview = () => {
      const subTitle = childSubTitleRef?.current?.getSubTitle();
      const subContent = childMarkdownRef?.current?.getContent();
      
      updateToServer(subTitle, subContent);
    }

    // TODO: Authorization; email, writer
    async function updateToServer(subTitle, subContent) {

      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
  
      const data = localStorage.getItem("userinfo");
      const userinfo = JSON.parse(data); // JSON -> javascript obj
      const email = userinfo.email;
      const writer = userinfo.name;

      const formObj = {
        content: subContent,
        subTitle: subTitle
      }

      await axios({
        method: 'put',
        url: `http://localhost:8080/auth/board/review/${id}`,
        data: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => {setIsModified(true)})
        .catch(e => alert(e.response.data.message));

    }

    if(isModified) {
      window.location = `/review/sub/${id}`
    }

    return (
      <>
        <TitleForm initialValue={title} readOnly={true}/>
        <Link initialValue={link} readOnly={true}/>
        <Difficulty initialValue={difficulty} initialState={true} readOnly={true}/>
        <Tag initialValue={tagList} readOnly={true}/>
        <SubTitleForm ref={childSubTitleRef} initialValue={subTitle}/>
        <MarkdownInput ref={childMarkdownRef} initialValue={subContent} />
        <MarkdownModify onModifySubReview={handleUpdateSubReview} isSub={true}/>
      </>
    )


}