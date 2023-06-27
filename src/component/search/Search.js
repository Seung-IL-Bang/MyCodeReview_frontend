import { useState } from "react";
import classes from "./Search.module.css";
import axios from "axios";

export default function Search(props) {

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);    
  };

  const handleBlur = () => {
    setIsFocused(false);
    document.querySelector("input").value = '';
  };

  const handleEnter = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      searchTitle(e.target.value);
    }
    else if (e.target.value.length === 0 && e.key === 'Enter') {
      searchTitle(''); // Total View
    }
  }

  const searchTitle = async (title) => {
    props.onSetQueryParam(`?types=k&keyword=${title}`)
  }

  return (
    <div className={`${classes.search} ${isFocused ? classes.focused : ""}`}>
      <input type="text" onKeyUp={handleEnter} onFocus={handleFocus} onBlur={handleBlur} placeholder={isFocused ? "제목을 입력하세요." : ""}/>
      <img src="/search.png" alt="search" />
    </div>
  );
}
