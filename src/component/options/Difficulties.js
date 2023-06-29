import DifficultyCol from "./DifficultyCol";

export default function Difficulties(props) {

  return (
    <>
      <DifficultyCol checkboxes={props.checkboxes} onHandleCheckboxChange={props.onHandleCheckboxChange} difficulty={"all"} />
      <DifficultyCol checkboxes={props.checkboxes} onHandleCheckboxChange={props.onHandleCheckboxChange} difficulty={"fifth"} />
      <DifficultyCol checkboxes={props.checkboxes} onHandleCheckboxChange={props.onHandleCheckboxChange} difficulty={"fourth"} />
      <DifficultyCol checkboxes={props.checkboxes} onHandleCheckboxChange={props.onHandleCheckboxChange} difficulty={"third"} />
      <DifficultyCol checkboxes={props.checkboxes} onHandleCheckboxChange={props.onHandleCheckboxChange} difficulty={"second"} />
      <DifficultyCol checkboxes={props.checkboxes} onHandleCheckboxChange={props.onHandleCheckboxChange} difficulty={"first"} />
    </>
  );
}
