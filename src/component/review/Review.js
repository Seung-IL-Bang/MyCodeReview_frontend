import { useParams } from "react-router";
import Header from "../../layout/Header";
import MarkdownViewer from "./MarkdownViewer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Review(props) {
  const { id } = useParams();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBoardById(id)
      .then(res => {
        setContent(res.content)
        setIsLoading(false)
      })
  }, [])

  const getBoardById = async (id) => {
    
    const accessToken = localStorage.getItem('accessToken')

    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/auth/board/${id}`,
      headers: {
        'Authorization' : `Bearer ${accessToken}`
      }
    })
    
    return response.data
  }

  return (
    <>
      <Header />
      {!isLoading && <MarkdownViewer content={content} />}
    </>
  );
}
