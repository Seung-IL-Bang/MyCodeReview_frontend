import { useParams } from "react-router";
import Header from "../../layout/Header";
import MarkdownViewer from "./MarkdownViewer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState";

export default function Review(props) {
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      getBoardById(id)
  }, [])

  const getBoardById = async (id) => {
    
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      try {
        await axios({
          method: 'get',
          url: `http://localhost:8080/board/${id}`,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          setData(res.data)
          setIsLoading(false)
        })
      } catch (e) {
        if(e.response.data.message === 'EXPIRED') {
          try {
              await callRefresh(); // refreshToken 호출
              console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
              getBoardById(id);
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
        url: `http://localhost:8080/board/${id}`
      }).then(res => {
        setData(res.data)
        setIsLoading(false)
      })
    }
  }

  return (
    <>
      <Header />
      {!isLoading ? <MarkdownViewer data={data} content={data.content} id={id}/> : <Spinner animation="border" />}
    </>
  );
}
