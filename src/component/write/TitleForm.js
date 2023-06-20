import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';

const TitleForm = forwardRef(function TitleForm(props, ref) {

  const [title, setTitle] = useState(props.initialValue || '');

  useImperativeHandle(ref, () => {
    return {
      getTitle() {
        return title
      }
    }
  }, [title]);


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }


  return (
    <>
      <Form.Label>제목</Form.Label>
      <Form.Control
        type="text"
        placeholder='제목을 입력해주세요.'
        value={title}
        onChange={handleTitleChange}
      />
    </>
  );
});

export default TitleForm;