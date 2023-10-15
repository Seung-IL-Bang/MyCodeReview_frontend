import { useRef, useState } from "react";
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
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState";


export default function SubWrite(props) {

    const [loginState, setLoginState] = useRecoilState(LoginState);
    const [isSubmitted, setIsSubmitted] = useState(false);

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


      postToServer(subTitle, subContent)
    }


    // TODO: Authorization, username, email 
    async function postToServer(subTitle, subContent) {
      
      const accessToken = localStorage.getItem('accessToken');

      const data = localStorage.getItem('userinfo')
      const userinfo = JSON.parse(data) // JSON -> javascript obj
      const email = userinfo.email
      const writer = userinfo.name

      const formObj = 
      {
        'subTitle': subTitle,
        'content': subContent
      }

      try {
        await axios({
          method: 'post',
          url: process.env.REACT_APP_SERVER_URL + `/auth/board/review/${id}`,
          data: JSON.stringify(formObj),
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
          .then(response => {setIsSubmitted(true)})
      } catch (e) {
        if(e.response.data.message === 'Expired Token') {
          try {
              await callRefresh(); // refreshToken 호출
              console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
              postToServer(subTitle, subContent);
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

    if(isSubmitted) {
      window.location = `/review/${id}`
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
