import { forwardRef, useImperativeHandle, useState } from "react";
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

const SubTitleForm = forwardRef(function SubTitleForm(props, ref) {

    const [subTitle, setSubTitle] = useState(props.initialValue || '');

    useImperativeHandle(ref, () => {
        return {
            getSubTitle() {
                return subTitle
            }
        }
    }, [subTitle])

    const handleSubTitleChange = (event) => {
        setSubTitle(event.target.value);
    }

    return (
        <>
        <InputGroup className="mb-3">
          <InputGroup.Text 
            id="inputGroup-sizing-default"
            >
            부제목
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            type="text"
            placeholder='부제목을 입력해주세요.'
            value={subTitle}
            onChange={handleSubTitleChange}
          />
        </InputGroup>
      </>
    )
});

export default SubTitleForm;