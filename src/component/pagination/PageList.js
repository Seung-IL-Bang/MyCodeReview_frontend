import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import classes from "./PageList.module.css";

export default function PageList(props) {
  const [active, setActive] = useState(1);
  let items = [];

  useEffect(() => {
    setActive(props.page)
  }, [props.page])

  // 이전 검색 || 필터 쿼리 스트링 유지하면서 페이지네이션 수행
  const handlePagination = (number) => {
    if (props.queryParam.length === 0) {
      props.onSetQueryParam(`?page=${number}`);
    } else {
      const oldParam = props.queryParam.replace(/(\?|&)(page=\d+)/g, "");
      if (oldParam.includes("?")) {
        props.onSetQueryParam(`${oldParam}&page=${number}`);
      } else {
        if (oldParam.length === 0) {
          props.onSetQueryParam(`?page=${number}`);
          
        } else {
          props.onSetQueryParam(`?page=${number}&${oldParam}`);
        }
      }
    }
  };

  const handlePrev = () => {
    setActive(props.start - 1);
    handlePagination(props.start - 1);
  };
  const handleNext = () => {
    setActive(props.end + 1);
    handlePagination(props.end + 1);
  };

  if (props.prev) {
    items.push(
      <Pagination.Item key={"prev"} onClick={handlePrev}>
        {"Prev"}
      </Pagination.Item>
    );
  }

  for (let number = props.start; number <= props.end; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (props.next) {
    items.push(
      <Pagination.Item key={"next"} onClick={handleNext}>
        {"Next"}
      </Pagination.Item>
    );
  }

  return (
    <div className={classes.list}>
      <Pagination> {items} </Pagination>
    </div>
  );
}
