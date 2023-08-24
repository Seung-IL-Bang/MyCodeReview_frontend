import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { Container, Row, Col } from 'react-bootstrap';
import MetaData from './MetaData';
import SubReviewList from '../subreview/SubReviewList';


import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Like from '../like/Like';
import Comment from '../comment/Comment';
import { useEffect, useState } from 'react';


export default function MarkdownViewer(props) {  

  const [comments, setComments] = useState(props.data.commentList);
  const [commentsCount, setCommentsCount] = useState(props.data.commentsCount);

  const addComment = (newComment) => {
    const newComments = comments.concat(newComment)
    setCommentsCount((prev) => prev + 1);
    setComments(newComments);
  }

  const removeComment = (commentId) => {
    const index = comments.findIndex(comment => comment.id === commentId);
    comments.splice(index, 1);
    setCommentsCount((prev) => prev - 1);
    setComments(comments);
  }

  const updateComment = (commentId, newComment) => {
    const index = comments.findIndex(comment => comment.id === commentId);
    comments.splice(index, 1, newComment);
    setComments(comments);
  }

  return (
    <Container className="d-flex justify-content-center" style={{ height: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} >
            <div style={{position: 'relative'}}>
              <MetaData data={props.data} content={props.content} subTitle={props.subTitle} boardId={props.id} isSub={props.isSub} subReviewId={props.subReviewId}/>
              <div style={{ position: 'absolute', top: '70%', right: '-20%' }}>
                <SubReviewList data={props.data} boardId={props.id} />
              </div> 
              <div style={{ position: 'absolute', top: '70%', left: '-20%' }}>
                <Like boardId={props.id} isLiked={props.data.liked} likeCount={props.data.likeCount} />
              </div>
            </div>
            <Viewer 
              initialValue={props.content}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}>
            </Viewer>
            <hr />
            <br />
            <Comment boardId={props.id} commentsCount={commentsCount} comments={comments} onAddComment={addComment} onRemoveComment={removeComment} onUpdateComment={updateComment}></Comment>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
