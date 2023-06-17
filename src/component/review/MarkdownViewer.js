import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { Container, Row, Col } from 'react-bootstrap';
import MetaData from './MetaData';


export default function MarkdownViewer(props) {  

  return (
    <Container className="d-flex justify-content-center" style={{ height: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <MetaData data={props.data} id={props.id}/>
            <Viewer initialValue={props.data.content} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
