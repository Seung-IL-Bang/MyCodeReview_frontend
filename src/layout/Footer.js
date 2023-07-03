import PageList from "../component/pagination/PageList";

export default function Footer(props) {
  
  return (
    <>
      <PageList page={props.page} queryParam={props.queryParam} onSetQueryParam={props.onSetQueryParam} start={props.start} end={props.end} prev={props.prev} next={props.next}/>
    </>
  );
}
