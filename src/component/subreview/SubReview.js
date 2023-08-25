import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../layout/Header";
import MarkdownViewer from "../review/MarkdownViewer";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function SubReview(props) {
  const { id } = useParams(); // subReveiw's id

  const [data, setData] = useState();
  const [boardId, setBoardId] = useState();
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const mainReviewData = useSelector((state) => state.subReview.data);
  const subContent = useSelector((state) => state.subReview.content);
  const subTitle = useSelector((state) => state.subReview.title)

  useEffect(() => {
    if (!mainReviewData || !subContent) {
      getSubReviewById(id).then((res) => {
        console.log(res);
        setData(res);
        setBoardId(res.boardId);
        setContent(res.content);
        setTitle(res.subTitle)
        setIsLoading(false);
      });
    } else {
      setData(mainReviewData);
      setContent(subContent);
      setTitle(subTitle);
      setBoardId(mainReviewData.id);
      setIsLoading(false);
    }
  }, []);

  const getSubReviewById = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const response = await axios({
        method: 'get',
        url: `http://localhost:8080/board/review/${id}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      return response.data
    } else {
      const response = await axios({
        method: 'get',
        url: `http://localhost:8080/board/review/${id}`
      })
      return response.data
    }
  };

  return (
    <>
      <Header />
      {!isLoading ? <MarkdownViewer subReviewId={id} isSub={true} data={data} content={content} subTitle={title} id={boardId} /> : <Spinner animation="border" />}
    </>
  );
}
