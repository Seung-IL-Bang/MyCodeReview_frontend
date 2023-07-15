import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../layout/Header";
import MarkdownViewer from "../review/MarkdownViewer";
import { Spinner } from "react-bootstrap";


export default function SubReview(props) {

    const { id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getSubReviewById(id)
            .then(res => {
                console.log(res)
                setData(res)
                setIsLoading(false)
            })
    }, [])

    const getSubReviewById = async (id) => {
        const accessToken = localStorage.getItem('accessToken')

        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/auth/board/review/${id}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data
    }



    return (
        <>
          <Header />
          {!isLoading ? <MarkdownViewer data={data} id={data.boardId} /> : <Spinner animation="border" />}
        </>
    );
}