import { useParams } from "react-router";
import Header from "../../layout/Header";
import MarkdownViewer from "./MarkdownViewer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";

export default function Review(props) {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      getBoardById(id)
        .then(res => {
          setData(res)
          setIsLoading(false)
        })
  }, [])

  const getBoardById = async (id) => {
    
    const accessToken = localStorage.getItem('accessToken')

    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/board/${id}`,
    })
    
    return response.data
  }

  return (
    <>
      <Header />
      {!isLoading ? <MarkdownViewer data={data} content={data.content} id={id}/> : <Spinner animation="border" />}
    </>
  );
}
