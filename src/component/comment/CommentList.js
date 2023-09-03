import Reply from "../reply/Reply";
import classes from "./CommentList.module.css";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import CommentModify from "./CommentModify";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState"
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";



export default function CommentList(props) {

  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [show, setShow] = useState(false);
  const [isModified, setIsModified] = useState(0);
  const [commentId, setCommentId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    setCommentId(id)
  };

  const handleDeleteComment = async (commentId) => {

    const accessToken = localStorage.getItem('accessToken')
    
    try {
      
      await axios({
        method: 'delete',
        url: `http://localhost:8080/auth/comment/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
        })
          .then(res => {
            props.onRemoveComment(commentId);
            handleClose();
          })
    } catch (e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            handleDeleteComment(commentId);
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

  const handleModify = (commentId) => {
    setIsModified(commentId);
  }


  const commentList = props.comments.map((comment, index) => (
    <div key={comment.id} className={classes.comment_wrapper}>
      <div className={classes.metadata}>
        <div className={`${classes.writer} ${classes.tooltip}`}>
          {comment.memberName}
          <span className={`${classes.tooltiptext} ${classes.tooltip_bottom}`}>{comment.memberEmail}</span>
        </div>
        {
          comment.myComment &&
          <div className={classes.action}>
            <span onClick={() => handleModify(comment.id)}>수정</span>
            <span className={classes.separator}>|</span>
            <span onClick={() => handleShow(comment.id)}>삭제</span>
          </div>
        }
      </div>
      {isModified === comment.id ? <CommentModify commentId={comment.id} boardId={props.boardId} content={comment.content} setIsModified={setIsModified} onUpdateComment={props.onUpdateComment}/> : <div>{comment.content}</div>}
      <Reply replies={comment.replies} repliesCount={comment.repliesCount} boardId={props.boardId} commentId={comment.id}/>
    </div>
  ))

  return (
    <div>
      {commentList}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>댓글 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          댓글을 정말로 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={() => handleDeleteComment(commentId)}>삭제</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}