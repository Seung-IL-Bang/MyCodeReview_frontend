import classes from "./MetaData.module.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  setTitle,
  setContent,
  setTagList,
  setLink,
  setDifficulty
} from "../../reducer/metaDataReducer";
import SelectedDifficulty from "../write/SelectedDifficulty";
import { setSubContent, setSubTitle } from "../../reducer/subReviewReducer";

export default function MetaData(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tagList = props.data.tagList.map((tag, index) => (
    <div key={`tag${index}`}>{tag}</div>
  ));

  const handleDeleteBoard = () => {
    deleteById(props.boardId).then((res) => {
      navigate("/myhome");
    });
  };

  const handleDeleteSubReview = () => {
    deleteBySubReviewId(props.subReviewId)
      .then((res) => {
        window.location = `/review/${props.boardId}`
      })
  }

  const handleMoveToModifyPage = () => {
    dispatch(setTitle(props.data.title));
    dispatch(setContent(props.content));
    dispatch(setTagList(props.data.tagList));
    dispatch(setLink(props.data.link));
    dispatch(setDifficulty(props.data.difficulty))
    navigate(`/modify/${props.boardId}`);
  };

  const handleMoveToSubReviewModifyPage = () => {
    dispatch(setTitle(props.data.title));
    dispatch(setTagList(props.data.tagList));
    dispatch(setLink(props.data.link));
    dispatch(setDifficulty(props.data.difficulty))
    dispatch(setSubContent(props.content))
    dispatch(setSubTitle(props.subTitle))
    navigate(`/modify/sub/${props.subReviewId}`);
  }

  const handleGoToSource = (e) => {
    e.preventDefault();
    window.open(props.data.link, '_blank');
  }

  const deleteById = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios({
      method: "delete",
      url: `http://localhost:8080/auth/board/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const deleteBySubReviewId = async (subReviewId) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios({
      method: 'delete',
      url: `http://localhost:8080/auth/board/review/${subReviewId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

  }

  return (
    <>
      <div className={classes.title}>{props.data.title}</div>
      <br />
      <Row className="justify-content">
        <SelectedDifficulty difficulty={props.data.difficulty}/>
      </Row>
      <Row className="justify-content">
        <div className={classes.tag_list_wrapper}>
          <div className={classes.tag_list}>{tagList}</div>
        </div>
      </Row>
      <Row className="justify-content-end">
        <Col>
          <div className={classes.action_links}>
            <div className={`${classes.img} ${classes.tooltip}`}>
              <img onClick={handleGoToSource} src="/output.png" alt="output" />
              <span className={`${classes.tooltiptext} ${classes.tooltip_bottom}`}>해당 문제 페이지로 이동</span>  
            </div>
            <span className={classes.separator}>|</span>
            <span onClick={props.isSub ? handleMoveToSubReviewModifyPage : handleMoveToModifyPage} className={classes.link}>
              수정
            </span>
            <span className={classes.separator}>|</span>
            <span onClick={props.isSub ? handleDeleteSubReview : handleDeleteBoard} className={classes.link}>
              삭제
            </span>
          </div>
        </Col>
      </Row>
      <br />
    </>
  );
}
