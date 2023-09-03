import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../layout/Header";
import MarkdownViewer from "../review/MarkdownViewer";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState";

export default function SubReview(props) {
  const { id } = useParams(); // subReveiw's id
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const [data, setData] = useState();
  const [boardId, setBoardId] = useState();
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const mainReviewData = useSelector((state) => state.subReview.data);
  const subContent = useSelector((state) => state.subReview.content);
  const subTitle = useSelector((state) => state.subReview.title)

  useEffect(() => {
    if (!mainReviewData || !subContent) {
      getSubReviewById(id)
    } else {
      setData(mainReviewData);
      setContent(subContent);
      setTitle(subTitle);
      setBoardId(mainReviewData.id);
      setIsLoading(false);
    }
  }, []);

  const getSubReviewById = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {

      try {
        await axios({
          method: 'get',
          url: process.env.REACT_APP_SERVER_URL + `/board/review/${id}`,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then((res) => {
          setData(res.data);
          setBoardId(res.data.boardId);
          setContent(res.data.content);
          setTitle(res.data.subTitle)
          setIsLoading(false);
        });
        
      } catch (e) {
        if(e.response.data.message === 'EXPIRED') {
          try {
              await callRefresh(); // refreshToken 호출
              console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
              getSubReviewById(id);
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
    } else {
      await axios({
        method: 'get',
        url: process.env.REACT_APP_SERVER_URL + `/board/review/${id}`
      }).then((res) => {
        setData(res.data);
        setBoardId(res.data.boardId);
        setContent(res.data.content);
        setTitle(res.data.subTitle)
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      <Header />
      {!isLoading ? <MarkdownViewer subReviewId={id} isSub={true} data={data} content={content} subTitle={title} id={boardId} /> : <Spinner animation="border" />}
    </>
  );
}
