import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";


function MarkdownSubmit(props) {

  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/')
  }

  return (
    <>
      <Button onClick={props.onSaveBoard} variant="primary" size="lg" active>
        저장하기
      </Button>{' '}
      <Button onClick={handleGoToHome} variant="secondary" size="lg" active>
        뒤로가기
      </Button>
    </>
  );
}

export default MarkdownSubmit;