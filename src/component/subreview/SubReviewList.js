import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import classes from './SubReviewList.module.css'
import { useNavigate } from "react-router";

export default function SubReviewList(props) {

  const navigate = useNavigate();

  const handleGetMainBoard = () => {
    navigate(`/review/${props.boardId}`)
  }

  const handleGetSubReview = (subReviewId) => {
    window.location = `/review/sub/${subReviewId}`
  }

  const handleAddReview = () => {

  }

  const postSubReview = async () => {
    
    
  }

  const subReviews = props.subreviews.map((subReview, index) => (
    <div className={classes.subtitle} key={`subreview${subReview.id}`}>
      <span>{`${index + 1}. `}</span>
      <span onClick={() => handleGetSubReview(subReview.id)}>{subReview.subTitle}</span>  
    </div>
  ))

  return (
      <div>
        <div>
          <Button variant="primary" onClick={handleAddReview}>Add Review</Button> 
          <div onClick={handleGetMainBoard} className={classes.subtitle}>{`0. ${props.boardTitle}`}</div>
          {subReviews}
        </div>
      </div>
  );  
}