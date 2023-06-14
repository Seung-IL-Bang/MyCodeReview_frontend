import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { LoginState } from '../store/loginState';
import axios from 'axios';
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export default function Home(props) {
  
  const [loginState, setLoginState] = useRecoilState(LoginState);
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    // 로그인 상태 false 인 경우 Content 비활성화
    // 로그인 상태 true 인 경우 Board List 조회
    if(loginState) {
      getBoardList()
      .then(res => {
        setIsLoading(false)
        setData(res)
      }).catch(e =>{
        alert('Exception:GET Board List')
      }) 
      
    }

    // Board List 조회 성공 시 데이터 props 로 전달
    // Board List 조회 실패 시 Content 비활성화

  }, [data])

  const getBoardList = async () => {

    const accessToken = localStorage.getItem('accessToken')
    
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8080/auth/board/list',
      headers : {
        'Authorization' : `Bearer ${accessToken}`
      }
    });

    return response.data
  }



  return (
    <div>
      <Header  />
      {(isLoading || !loginState) && <div>Loading Data...</div>}
      {!isLoading && (loginState && data) && <Content list={data}/>} 
      <Footer />
    </div>
  );
}
