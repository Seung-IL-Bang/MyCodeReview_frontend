import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../store/loginState";
import axios from "axios";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { Spinner } from "react-bootstrap";

export default function Home(props) {
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const [queryParam, setQueryParam] = useState('');
  const [data, setData] = useState(null);
  const [dtoTags, setDtoTags] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getBoardList = async (queryParam) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios({
      method: "get",
      url: `http://localhost:8080/auth/board/v2/list${queryParam}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
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
          alert("Exception:GET Board List");
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
