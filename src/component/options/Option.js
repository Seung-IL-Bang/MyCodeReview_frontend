import { useState } from "react";
import classes from './Option.module.css'
import { Row } from "react-bootstrap";
import Difficulties from "./Difficulties";

export default function Option(props) {

  const [isClick, setIsClick] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [disabled, setDisabled] = useState(props.disabled);

  const handleOption = () => {
    setIsClick((prevState) => {
      return !prevState;
    })
  }

  const handleClearChecked = () => {
    // Checkbox 모두 해제
    setCheckedList([]);
  };

  const handleFilterDifficulty = () => {
    
    if (checkedList.length !== 0) {
      const params = "difficulties=" +  Array.from(new Set(checkedList)).join("&difficulties="); // 쿼리 스트링 중복 방지 => new Set()
      
      props.onSetQueryParam(`?types=d&${params}`)
    }
    else if (checkedList.length === 0) {
      props.onSetQueryParam("");
    }
  };


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {            
      // 체크된 체크박스 추가
      if(["diamond", "platinum", "gold", "silver", "bronze"].includes(name)) {
        const all = [name, name + "5", name + "4", name + "3", name + "2", name + "1"];
        setCheckedList((prevState) => {
          return [...all, ...prevState];
        });
      } else {
        setCheckedList((prevState) => {
          return [name, ...prevState];
        });
      }
    } 
    else {
      // 체크 해제된 체크박스를 제거
      if(["diamond", "platinum", "gold", "silver", "bronze"].includes(name)) {
        for(let i = 0; i <= 5; i++) {
          if (i === 0) {
            setCheckedList((prevCheckboxes) => prevCheckboxes.filter((checkbox) => checkbox !== name));
          } else {
            setCheckedList((prevCheckboxes) => prevCheckboxes.filter((checkbox) => checkbox !== name + i));
          }
        }
      } else {
        setCheckedList((prevCheckboxes) => prevCheckboxes.filter((checkbox) => checkbox !== name));
        setCheckedList((prevCheckboxes) => prevCheckboxes.filter((checkbox) => checkbox !== name.slice(0, name.length - 1)));
      }
    }
  };

  
  return (
    <div>
      {
        !disabled &&
        <div className={classes.option} onClick={handleOption}>옵션<b className={`${classes.caret} ${isClick ? classes.rotate : ''}`}></b></div>
      }
      {isClick && 
      <div>
        <Row className={classes.title}>문제 난이도</Row>
        <hr />
        <Row className={classes.difficulty_list}>
          <Difficulties onHandleCheckboxChange={handleCheckboxChange} checkboxes={checkedList} />
        </Row>
        <div className={classes.btn}>
          <div onClick={handleClearChecked}>초기화</div>
          <div onClick={handleFilterDifficulty}>확인</div>
        </div>
      </div>}
    </div>
  );
}
