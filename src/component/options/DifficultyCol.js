import { Col } from "react-bootstrap";
import classes from "./Difficulty.module.css"


export default function DifficultyCol(props) {

  const difficultyList = {
    all: {
      diamond: "21-a",
      platinum: "16-a",
      gold: "11-a",
      silver: "6-a",
      bronze: "1-a",
    },
    fifth: {
      diamond5: "21",
      platinum5: "16",
      gold5: "11",
      silver5: "6",
      bronze5: "1",
    },
    fourth: {
      diamond4: "22",
      platinum4: "17",
      gold4: "12",
      silver4: "7",
      bronze4: "2",
    },
    third: {
      diamond3: "23",
      platinum3: "18",
      gold3: "13",
      silver3: "8",
      bronze3: "3",
    },
    second: {
      diamond2: "24",
      platinum2: "19",
      gold2: "14",
      silver2: "9",
      bronze2: "4",
    },
    first: {
      diamond1: "25",
      platinum1: "20",
      gold1: "15",
      silver1: "10",
      bronze1: "5",
    },
  };

  let difficulty = {};

  switch (props.difficulty) {
    case "all":
      difficulty = difficultyList["all"];
      break;
    case "fifth":
      difficulty = difficultyList["fifth"];
      break;
    case "fourth":
      difficulty = difficultyList["fourth"];
      break;
    case "third":
      difficulty = difficultyList["third"];
      break;
    case "second":
      difficulty = difficultyList["second"];
      break;
    case "first":
      difficulty = difficultyList["first"];
      break;
    default:
      break;
  }


  const elements = Object.entries(difficulty).map(([key, value]) => (
    <label key={key} className={classes.label_container}>
      <input type="checkbox" name={key} value={value} checked={(props.checkboxes).includes(key)} onChange={props.onHandleCheckboxChange}/>
      <img
        src={`https://d2gd6pc034wcta.cloudfront.net/tier/${value}.svg`}
        alt={key}
      />
    </label>
  ));



  return (
    <Col className={classes.col}>
      {elements}
    </Col>
  );
}
