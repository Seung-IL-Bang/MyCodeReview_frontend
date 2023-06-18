import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';


function MarkdownModify(props) {
  

  const navigate = useNavigate();

  const handleGoToBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Button onClick={props.onModifyBoard} variant="primary" size="lg" active>
        수정하기
      </Button>
      <Button onClick={handleGoToBack} variant="secondary" size="lg" active>
        뒤로가기
      </Button>
    </>
  );
}

export default MarkdownModify;