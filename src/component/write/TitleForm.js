import Form from 'react-bootstrap/Form';

function TitleForm(props) {

  const GetTitle = (event) => {
    props.onGetTitle(event.target.value)
  } 

  return (
    <>
      <Form.Label htmlFor="inputPassword5">제목</Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        placeholder='제목을 입력해주세요.'
        onChange={GetTitle}
      />
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
    </>
  );
}

export default TitleForm;