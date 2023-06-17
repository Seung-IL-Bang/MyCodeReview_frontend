import classes from './MetaData.module.css'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function MetaData(props) {

  const navigate = useNavigate()

  const handleDeleteBoard = () => {
    
    deleteById(props.id)
      .then(res => {
        navigate('/')
      })
  }

  const deleteById = async (id) => {
    
    const accessToken = localStorage.getItem('accessToken')

    const response = await axios({
      method : 'delete',
      url: `http://localhost:8080/auth/board/${id}`,
      headers : {
        'Authorization' : `Bearer ${accessToken}`
      }
    })


    return response.data
  }

  return (
    <>
      <div className={classes.title}>{props.data.title}</div>
      <br />
      <Row className="justify-content-end">
        <Col>
          <div className={classes.action_links}>
            <span className={classes.link}>수정</span>
            <span className={classes.separator}>|</span>
            <span onClick={handleDeleteBoard} className={classes.link}>삭제</span>
          </div>
        </Col>
      </Row>
      <hr />
      <br />
    </>
  );
}
