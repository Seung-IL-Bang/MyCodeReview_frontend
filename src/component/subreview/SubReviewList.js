import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import classes from "./SubReviewList.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setData, setSubContent } from "../../reducer/subReviewReducer";
import { setContent } from "../../reducer/metaDataReducer";

export default function SubReviewList(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetMainBoard = () => {
    window.location = `/review/${props.boardId}`
  };

  const handleGetSubReview = (subReviewId, subReviewContent) => {
    dispatch(setData(props.data));
    dispatch(setSubContent(subReviewContent));
    navigate(`/review/sub/${subReviewId}`);
  };

  const handleAddReview = () => {};

  const subReviews = props.data.reviewList.map((subReview, index) => (
    <div className={classes.subtitle} key={`subreview${subReview.id}`}>
      <span>{`${index + 1}. `}</span>
      <span onClick={() => handleGetSubReview(subReview.id, subReview.content)}>
        {subReview.subTitle}
      </span>
    </div>
  ));

  return (
    <div>
      <div>
        <Button variant="primary" onClick={handleAddReview}>
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
