import Home from "./layout/Home";
import { Route, Routes } from 'react-router-dom';
import GetTokens from "./api/GetTokens";
import GetUserInfo from "./api/GetUserInfo";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tokens" element={<GetTokens />} />
        <Route path="/userinfo" element={<GetUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
