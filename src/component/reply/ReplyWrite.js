import classes from './ReplyWrite.module.css'
import ReplyWriteEditor from './ReplyWriteEditor';
import {useState} from 'react'; 


export default function ReplyWrite(props) {

  const [show, setShow] = useState(false);
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setShow(prev => !prev);
    setIsClick(prev => !prev);
  }

  return (
    <div className={classes.container}>
      { !show ? <div className={classes.writeBtn} onClick={handleClick}>답글 달기<b className={`${classes.caret} ${isClick ? classes.rotate : ''}`}></b></div> :
        <div>
          <div className={classes.writeBtn} onClick={handleClick}>숨기기<b className={`${classes.caret} ${isClick ? classes.rotate : ''}`}></b></div>
          <ReplyWriteEditor onAddReply={props.onAddReply} boardId={props.boardId} commentId={props.commentId} onSetShow={setShow}/>
        </div>
      }
    </div>
  );
}