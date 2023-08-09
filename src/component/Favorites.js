import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Spinner } from "react-bootstrap";
import Content from "../layout/Content";
import Footer from "../layout/Footer";

export default function Favorites(props) {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [queryParam, setQueryParam] = useState('');
  const [page, setPage] = useState(1);


  const getLikedBoardListWithPaging = async (queryParam) => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const response = await axios({
      method: "get",
      url: `http://localhost:8080/auth/board/liked/list${queryParam}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return response.data;
  }


  useEffect(() => {
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
        alert("Exception:GET Board List");
      });
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
