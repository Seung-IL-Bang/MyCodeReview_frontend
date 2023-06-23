import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

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
      <InputGroup className="mb-3">
        <InputGroup.Text 
          id="inputGroup-sizing-default"
          >
          제목
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type="text"
          placeholder='제목을 입력해주세요.'
          value={title}
          onChange={handleTitleChange}
        />
      </InputGroup>
    </>
  );
});

export default TitleForm;