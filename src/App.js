import axios from "axios";

function App() {

  const prefix1 = 'accessToken='
  const prefix2 = ' refreshToken='

  const callServer = async () => {
    console.log("call server 1...")

    const cookieValues = document.cookie.split(';')

    console.log(cookieValues)

    const accessToken = cookieValues[0].substring(prefix1.length)
    const refreshToken = cookieValues[1].substring(prefix2.length)

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    

    const authHeader = {"Authorization": `Bearer ${accessToken}`}

    try {
        const res = await axios.get("http://localhost:8080/auth/doA",
            {headers: authHeader});

        console.log(res.data)
        

        return res.data;
    } catch (err) {
        if (err.response.data.msg === 'Expired Token') { // 만료된 Access Token
            console.log("Refresh Your Token")

            try {
                await callRefresh(accessToken, refreshToken); // refreshToken 호출
                console.log("new tokens...saved..."); // 새로운 토큰 저장 후 다시 원래 기능 호출
                return callServer();
            } catch (refreshErr) {
                throw refreshErr.response.data.msg
            }
        } // end if
    }
};

const callRefresh = async (accessToken, refreshToken) => {

    const tokens = {accessToken, refreshToken}
    const res = await axios.post("http://localhost:8080/refreshToken", tokens)

    localStorage.setItem("accessToken", res.data.accessToken)
    localStorage.setItem("refreshToken", res.data.refreshToken)
}



  return (
    <div className="App">
      <button onClick={callServer} >callServer</button>
    </div>
  );
}

export default App;
