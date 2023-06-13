import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';

const TitleForm = forwardRef(function TitleForm(props, ref) {

  const [title, setTitle] = useState();

  useImperativeHandle(ref, () => {
    return {
      getTitle() {
        console.log('getTitle : ' + title)
        return title
      }
    }
  }, [title]);


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }


  return (
    <>
      <Form.Label htmlFor="inputPassword5">제목</Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        placeholder='제목을 입력해주세요.'
        onChange={handleTitleChange}
      />
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
    </>
  );
});

export default TitleForm;