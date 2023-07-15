import Home from "./layout/Home";
import { Route, Routes } from 'react-router-dom';
import GetTokens from "./api/GetTokens";
import GetUserInfo from "./api/GetUserInfo";
import Write from "./component/write/Write";
import Review from "./component/review/Review";
import Modify from "./component/modify/Modify";
import SubReview from "./component/subreview/SubReview";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/modify/:id" element={<Modify />} />
        <Route path="/review/:id" element={<Review />}/>
        <Route path="/review/sub/:id" element={<SubReview />}/> 
        <Route path="/tokens" element={<GetTokens />} />
        <Route path="/userinfo" element={<GetUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
