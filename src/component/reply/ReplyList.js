import classes from "./ReplyList.module.css";
import {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ReplyModify from "./ReplyModify";
import ReplyWrite from "./ReplyWrite";
import ReplyWriteEditor from "./ReplyWriteEditor";
import { callRefresh, clearLocalStorage } from "../../util/LoginUtil";
import { useRecoilState } from "recoil";
import { LoginState } from "../../store/loginState";

export default function ReplyList(props) {

  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [isModified, setIsModified] = useState(0);
  const [replyId, setReplyId] = useState();
  const [isWrite, setIsWrite] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const handleModify = (replyId) => {
    setIsModified(replyId);
  }

  const handleWrite = () => {
    setIsWrite(true);
  }

  const handleClose = () => setShowModal(false);
  const handleShowModal = (id) => {
    setShowModal(true)
    setReplyId(id)
  };

  const handleClick = () => {
    setShow(prev => !prev);
    setIsClick(prev => !prev);
  }


  const handleDeleteReply = async (replyId) => {

    const accessToken = localStorage.getItem('accessToken')
    
    try {
      await axios({
        method: 'delete',
        url: process.env.REACT_APP_SERVER_URL + `/auth/reply/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
        })
          .then(res => {
            props.onRemoveReply(replyId);
            handleClose();
          })
    } catch (e) {
      if(e.response.data.message === 'Expired Token') {
        try {
            await callRefresh(); // refreshToken 호출
            console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
            handleDeleteReply(replyId);
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


  const replyList = props.replies.map((reply, index) => (
    <div key={reply.id} className={classes.reply_wrapper}>
      <div className={classes.metadata}>
          <div className={`${classes.writer} ${classes.tooltip}`}>
            {reply.memberName}
            <span className={`${classes.tooltiptext} ${classes.tooltip_bottom}`}>{reply.memberEmail}</span>
          </div>
      {
        reply.myReply &&
        <div className={classes.action}>
          <span onClick={() => handleModify(reply.id)}>수정</span>
          <span className={classes.separator}>|</span>
          <span onClick={() => handleShowModal(reply.id)}>삭제</span>
        </div>
      }
      </div>
      {isModified === reply.id ? <ReplyModify boardId={reply.boardId} commentId={props.commentId} content={reply.content} onUpdateReply={props.onUpdateReply} setIsModified={setIsModified} replyId={reply.id} /> : <div>{reply.content}</div>}
    </div>
  ));

  
  return (
    <div className={classes.container}>
      {
        !show ? <div className={classes.listBtn} onClick={handleClick}>{props.repliesCount}개 답글<b className={`${classes.caret} ${isClick ? classes.rotate : ''}`}></b></div> :
        <div>
          <div className={classes.listBtn} onClick={handleClick}>숨기기<b className={`${classes.caret} ${isClick ? classes.rotate : ''}`}></b></div>
          <div className={classes.list_wrapper}>
            {replyList}
            {!isWrite ? <button className={classes.writeBtn} onClick={handleWrite}>답글 작성하기</button> 
              :
              <ReplyWriteEditor onAddReply={props.onAddReply} boardId={props.boardId} commentId={props.commentId} onSetShow={setIsWrite}/>
            }
          </div>
        </div>
      }
    

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>답글 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          답글을 정말로 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={() => handleDeleteReply(replyId)}>삭제</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}