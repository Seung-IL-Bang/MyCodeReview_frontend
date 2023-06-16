import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


export default function MarkdownViewer(props) {  

  return (
    <Container className="d-flex justify-content-center" style={{ height: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Viewer initialValue={props.content} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
