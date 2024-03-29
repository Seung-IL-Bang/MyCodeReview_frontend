
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';


function SubReviewAdd(props) {
  

  const navigate = useNavigate();

  const handleGoToBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Button onClick={props.onAddSubReview} variant="primary" size="lg" active>
        리뷰추가
      </Button>
      <Button onClick={handleGoToBack} variant="secondary" size="lg" active>
        뒤로가기
      </Button>
    </>
  );
}

export default SubReviewAdd;