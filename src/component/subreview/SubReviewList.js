import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import classes from "./SubReviewList.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setData, setSubContent, setSubTitle } from "../../reducer/subReviewReducer";
import { setTitle, setTagList, setLink, setDifficulty } from "../../reducer/metaDataReducer";

export default function SubReviewList(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetMainBoard = () => {
    window.location = `/review/${props.boardId}`
  };

  const handleGetSubReview = (subReviewId, subReviewContent, subReviewTitle) => {
    dispatch(setData(props.data));
    dispatch(setSubContent(subReviewContent));
    dispatch(setSubTitle(subReviewTitle))
    window.location = `/review/sub/${subReviewId}`;
  };

  const handleAddReview = (boardId) => {
    dispatch(setTitle(props.data.title));
    dispatch(setTagList(props.data.tagList));
    dispatch(setLink(props.data.link));
    dispatch(setDifficulty(props.data.difficulty))
    navigate(`/write/sub/${boardId}`)

  };

  const subReviews = props.data.reviewList.map((subReview, index) => (
    <div className={classes.subtitle} key={`subreview${subReview.id}`}>
      <span>{`${index + 1}. `}</span>
      <span onClick={() => handleGetSubReview(subReview.id, subReview.content, subReview.subTitle)}>
        {subReview.subTitle}
      </span>
    </div>
  ));

  return (
    <div>
      <div>
        <Button variant="primary" onClick={() => handleAddReview(props.boardId)}>
          Add Review
        </Button>
        <div
          onClick={handleGetMainBoard}
          className={classes.subtitle}
        >{`0. ${props.data.title}`}</div>
        {subReviews}
      </div>
    </div>
  );
}
