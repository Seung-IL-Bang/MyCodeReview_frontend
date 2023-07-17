import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TitleForm from "./TitleForm";
import Difficulty from "./Difficulty";
import MarkdownInput from "./MarkdownInput";
import SubReviewAdd from "../subreview/SubReviewAdd";
import Tag from "./Tag";
import Link from "./Link";
import axios from "axios";
import SubTitleForm from "./SubTitleForm";


export default function SubWrite(props) {

    const { id } = useParams(); // boardId

    const childMarkdownRef = useRef();
    const childSubTitleRef = useRef();

    const title = useSelector((state) => state.metaData.title);
    const tagList = useSelector((state) => state.metaData.tagList);
    const link = useSelector((state) => state.metaData.link);
    const difficulty = useSelector((state) => state.metaData.difficulty);

    const handleAddReviewInBoard = () => {
      
      const subContent = childMarkdownRef?.current?.getContent();
      const subTitle = childSubTitleRef?.current?.getSubTitle();


      const res = postToServer(subTitle, subContent)

      window.location = `/review/${id}`
    }


    // TODO: Authorization, username, email 
    async function postToServer(subTitle, subContent) {
      
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const data = localStorage.getItem('userinfo')
      const userinfo = JSON.parse(data) // JSON -> javascript obj
      const email = userinfo.email
      const writer = userinfo.name

      const formObj = 
      {
        'subTitle': subTitle,
        'content': subContent
      }

      const responsee = await axios({
        method: 'post',
        url: `http://localhost:8080/auth/board/review/${id}`,
        data: JSON.stringify(formObj),
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })

      return responsee.data
    }

    

    return (
        <>
          <TitleForm initialValue={title} readOnly={true}/>
          <Link initialValue={link} readOnly={true}/>
          <Difficulty initialValue={difficulty} initialState={true} readOnly={true}/>
          <Tag initialValue={tagList} readOnly={true}/>
          <SubTitleForm ref={childSubTitleRef}/>
          <MarkdownInput ref={childMarkdownRef} initialValue={""} />
          <SubReviewAdd onAddSubReview={handleAddReviewInBoard}/>
        </>
    );
}
