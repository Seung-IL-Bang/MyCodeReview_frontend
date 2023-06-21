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

export default function MetaData(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tagList = props.data.tagList.map((tag, index) => (
    <div key={`tag${index}`}>{tag}</div>
  ));

  const handleDeleteBoard = () => {
    deleteById(props.id).then((res) => {
      navigate("/");
    });
  };

  const handleMoveToModifyPage = () => {
    dispatch(setTitle(props.data.title));
    dispatch(setContent(props.data.content));
    dispatch(setTagList(props.data.tagList));
    dispatch(setLink(props.data.link));
    dispatch(setDifficulty(props.data.difficulty))
    navigate(`/modify/${props.id}`);
  };

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

  return (
    <>
      <div className={classes.title}>{props.data.title}</div>
      <br />
      <Row className="justify-content">
        <SelectedDifficulty difficulty={props.data.difficulty}/>
      </Row>
      <Row className="justify-content">
        <div className={classes.tag_list}>{tagList}</div>
      </Row>
      <Row className="justify-content-end">
        <Col>
          <div className={classes.action_links}>
            <div className={`${classes.img} ${classes.tooltip}`}>
              <img onClick={handleGoToSource} src="/output.png" alt="output" />
              <span className={`${classes.tooltiptext} ${classes.tooltip_bottom}`}>해당 문제 페이지로 이동</span>  
            </div>
            <span className={classes.separator}>|</span>
            <span onClick={handleMoveToModifyPage} className={classes.link}>
              수정
            </span>
            <span className={classes.separator}>|</span>
            <span onClick={handleDeleteBoard} className={classes.link}>
              삭제
            </span>
          </div>
        </Col>
      </Row>
      <br />
    </>
  );
}
