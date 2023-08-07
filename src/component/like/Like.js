import axios from "axios";
import { useState } from "react";
import { classes } from './Like.module.css';


export default function Like(props) {


    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [isLiked, setIsLiked] = useState(props.isLiked);

    const downLike = async () => {

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const userData = localStorage.getItem('userinfo');
        const userInfo = JSON.parse(userData);
        const email = userInfo.email;
        const writer = userInfo.name;

        const formObj = {
            'boardId': props.boardId,
            'memberEmail': email
        }


        await axios({
            method: 'delete',
            url: 'http://localhost:8080/auth/like',
            data: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        }).then(res => {
            setLikeCount((prevState) => prevState - 1)
            setIsLiked((prevState) => !prevState)
        }).catch(error => {
            alert(error.response.data.message)
        })
    }

    const upLike = async () => {

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const userData = localStorage.getItem('userinfo');
        const userInfo = JSON.parse(userData);
        const email = userInfo.email;
        const writer = userInfo.name;

        const formObj = {
            'boardId': props.boardId,
            'memberEmail': email
        }

        await axios({
            method: 'post',
            url: 'http://localhost:8080/auth/like',
            data: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        }).then(res => {
            setLikeCount((prevState) => prevState + 1)
            setIsLiked((prevState) => !prevState)
        }).catch(error => {
            alert(error.response.data.message)
        })
    }

    const handleLikeChange = () => {
        if(isLiked) {
            downLike()
        } else {
            upLike()
        }
    }


    return (
        <div>
            <img src="/favorite.png" alt="favorite" onClick={handleLikeChange}/>
            <div>{likeCount}</div>
        </div>
    );
}