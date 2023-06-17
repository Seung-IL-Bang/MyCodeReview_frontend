import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { LoginState } from '../store/loginState';
import axios from 'axios';
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { Spinner } from "react-bootstrap";

export default function Home(props) {
  
  const [loginState, setLoginState] = useRecoilState(LoginState);
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBoardList = async () => {

    const accessToken = localStorage.getItem('accessToken')
    
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8080/auth/board/v1/list',
      headers : {
        'Authorization' : `Bearer ${accessToken}`
      }
    });

    return response.data
  }

  useEffect(() =>{
    // 로그인 상태 false 인 경우 Content 비활성화
    // 로그인 상태 true 인 경우 Board List 조회
    // Board List 조회 성공 시 데이터 props 로 전달
    // Board List 조회 실패 시 Content 비활성화
    if(loginState) {
      getBoardList()
      .then(res => {
        setIsLoading(false)
        setData(res.dtoList)
      }).catch(e =>{
        alert('Exception:GET Board List')
      }) 
      
    }
  }, []) // 의존성 배열에 data 넣거나 의존성 배열 미작성시 무한 요청

  return (
    <div>
      <Header  />
      {(isLoading || !loginState) && <Spinner animation="border" />}
      {!isLoading && (loginState && data) && <Content list={data}/>} 
      <Footer />
    </div>
  );
}
