import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../store/loginState";
import { callRefresh, clearLocalStorage } from '../util/LoginUtil'
import { Spinner } from "react-bootstrap";
import axios from "axios";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export default function Home(props) {
  
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [queryParam, setQueryParam] = useState('');
  const [data, setData] = useState(null);
  const [dtoTags, setDtoTags] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getBoardList = async (queryParam) => {
    const accessToken = localStorage.getItem("accessToken");

    try {

      const response = await axios({
        method: "get",
        url: `http://localhost:8080/auth/board/v2/list${queryParam}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return response.data;

    } catch(e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            return getBoardList(queryParam);
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
  };

  useEffect(() => {
    if (loginState) {
      getBoardList(queryParam)
        .then((res) => {
          if (!queryParam.includes("page")) {
            setPage(1)
          } else {
            setPage(res.page)
          }
          setData(res);
          setDtoTags(res.dtoTags);
          setIsLoading(false);
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    } else {
      window.location = '/'
      alert('로그인이 필요한 요청입니다.')
    }
  }, [queryParam]); // 의존성 배열에 data 넣거나 의존성 배열 미작성시 무한 요청

  return (
    <div>
      <Header onSetQueryParam={setQueryParam} />
      {(isLoading || !loginState) && <Spinner animation="border" />}
      {!isLoading && loginState && data && dtoTags && <Content tags={dtoTags} list={data['dtoList']} total={data['total']} onSetQueryParam={setQueryParam} />}
      {!isLoading && <Footer page={page} queryParam={queryParam} onSetQueryParam={setQueryParam} start={data["start"]} end={data["end"]} prev={data["prev"]} next={data["next"]} />}
    </div>
  );
}
