import Home from "./layout/Home";
import { Route, Routes } from 'react-router-dom';
import GetTokens from "./api/GetTokens";
import GetUserInfo from "./api/GetUserInfo";
import Write from "./component/write/Write";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/tokens" element={<GetTokens />} />
        <Route path="/userinfo" element={<GetUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
