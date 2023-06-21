export default function SelectedDifficulty(props) {
  let selectedImage = "";
  switch (props.difficulty) {
    case "diamond":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/21-a.svg";
      break;
    case "diamond5":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/21.svg";
      break;
    case "diamond4":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/22.svg";
      break;
    case "diamond3":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/23.svg";
      break;
    case "diamond2":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/24.svg";
      break;
    case "diamond1":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/25.svg";
      break;
    case "platinum":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/16-a.svg";
      break;
    case "platinum5":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/16.svg";
      break;
    case "platinum4":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/17.svg";
      break;
    case "platinum3":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/18.svg";
      break;
    case "platinum2":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/19.svg";
      break;
    case "platinum1":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/20.svg";
      break;
    case "gold":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/11-a.svg";
      break;
    case "gold5":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/11.svg";
      break;
    case "gold4":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/12.svg";
      break;
    case "gold3":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/13.svg";
      break;
    case "gold2":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/14.svg";
      break;
    case "gold1":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/15.svg";
      break;
    case "silver":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/6-a.svg";
      break;
    case "silver5":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/6.svg";
      break;
    case "silver4":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/7.svg";
      break;
    case "silver3":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/8.svg";
      break;
    case "silver2":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/9.svg";
      break;
    case "silver1":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/10.svg";
      break;
    case "bronze":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/1-a.svg";
      break;
    case "bronze5":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/1.svg";
      break;
    case "bronze4":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/2.svg";
      break;
    case "bronze3":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/3.svg";
      break;
    case "bronze2":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/4.svg";
      break;
    case "bronze1":
      selectedImage = "https://d2gd6pc034wcta.cloudfront.net/tier/5.svg";
      break;

    // 남은 난이도에 대한 case 문 추가
    default:
      selectedImage = null;
  }

  return (
    <div>
      <img src={selectedImage} alt={props.difficulty} />
    </div>
  );
}
