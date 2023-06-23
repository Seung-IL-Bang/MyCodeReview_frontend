import { forwardRef, useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

const Link = forwardRef(function Link(props, ref) {

  const [link, setLink] = useState(props.initialValue);

  useImperativeHandle(ref, () => {
    return {
      getLink() {
        return link
      }
    }
  }, [link])


  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }
  
  return (
    <InputGroup size="sm" className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-sm">문제 링크</InputGroup.Text>
    <Form.Control
      aria-label="Small"
      aria-describedby="inputGroup-sizing-sm"
      type="text"
      placeholder='문제 링크를 입력해주세요.'
      value={link}
      onChange={handleLinkChange}
    />
  </InputGroup>
  );
});

export default Link;