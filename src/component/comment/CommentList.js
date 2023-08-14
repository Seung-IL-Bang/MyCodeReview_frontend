import Reply from "../reply/Reply";
import classes from "./CommentList.module.css";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import CommentModify from "./CommentModify";


export default function CommentList(props) {

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
    const refreshToken = localStorage.getItem('refreshToken')
    
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
        .catch(e => alert(e.response.data.message));
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
      <Reply />
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