import Header from "./layout/Header";
import { Route, Routes } from 'react-router-dom';
import Login from "./api/Login";
import GetUserInfo from "./api/GetUserInfo";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/token" element={<Login />} />
        <Route path="/userinfo" element={<GetUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
