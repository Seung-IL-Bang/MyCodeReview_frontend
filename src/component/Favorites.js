import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Spinner } from "react-bootstrap";
import Content from "../layout/Content";
import Footer from "../layout/Footer";
import { useRecoilState } from "recoil";
import { LoginState } from "../store/loginState";
import {callRefresh, clearLocalStorage} from "../util/LoginUtil";

export default function Favorites(props) {

  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [queryParam, setQueryParam] = useState('');
  const [page, setPage] = useState(1);


  const getLikedBoardListWithPaging = async (queryParam) => {

    const accessToken = localStorage.getItem('accessToken')

    try {
      
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_URL + `/auth/board/liked/list${queryParam}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
  
      return response.data;

    } catch(e) {
      if(e.response.data.message === 'Expired Token') {
        try {
          await callRefresh();
          console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
          return getLikedBoardListWithPaging(queryParam);
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
  }


  useEffect(() => {
    if(loginState) {
      getLikedBoardListWithPaging(queryParam)
        .then((res) => {
          if(!queryParam.includes("page")) {
            setPage(1)
          } else {
            setPage(res.page)
          }
          setData(res)
          setIsLoading(false)
        }).catch((e) => {
          alert(e.response.data.message);
        });
    } else {
      window.location = '/'
      alert('로그인이 필요한 요청입니다.')
    }
  }, [queryParam])


  return (
    <div>
      <Header onSetQueryParam={setQueryParam} />
      {isLoading && <Spinner animation="border" />}
      {!isLoading && data && (
        <Content
          tags={[]}
          list={data["dtoList"]}
          total={null}
          onSetQueryParam={setQueryParam}
          disabled={true}
        />
      )}
      {!isLoading && (
        <Footer
          page={page}
          queryParam={queryParam}
          onSetQueryParam={setQueryParam}
          start={data["start"]}
          end={data["end"]}
          prev={data["prev"]}
          next={data["next"]}
        />
      )}
    </div>
  );
}
