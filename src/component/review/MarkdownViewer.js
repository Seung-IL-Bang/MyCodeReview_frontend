import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { Container, Row, Col } from 'react-bootstrap';
import MetaData from './MetaData';
import SubReviewList from '../subreview/SubReviewList';


import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';


export default function MarkdownViewer(props) {  

  return (
    <Container className="d-flex justify-content-center" style={{ height: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} style={{position: 'relative'}}>
            <MetaData data={props.data} id={props.id}/>
            <Viewer 
              initialValue={props.content}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} />
            <div style={{ position: 'absolute', top: '50%', right: '-200px' }}>
              <SubReviewList data={props.data} boardId={props.id} />
            </div>  
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
