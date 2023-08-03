import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Spinner } from "react-bootstrap";
import Content from "../layout/Content";
import Footer from "../layout/Footer";



export default function MainHome(props) {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [queryParam, setQueryParam] = useState('');
  const [page, setPage] = useState(1);



  const getPublicBoardListWithPaging = async (queryParam) => {
    const response = await axios({
      method: "get",
      url: `http://localhost:8080/board/list${queryParam}`
    })

    return response.data;
  }

  useEffect(() => {
    getPublicBoardListWithPaging(queryParam)
      .then((res) => {
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
      {!isLoading && data && <Content tags={[]} list={data['dtoList']} total={null} onSetQueryParam={setQueryParam} />}
      {!isLoading && <Footer page={page} queryParam={queryParam} onSetQueryParam={setQueryParam} start={data["start"]} end={data["end"]} prev={data["prev"]} next={data["next"]} />}
    </div>
  );
}
