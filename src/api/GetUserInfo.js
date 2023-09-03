import { useEffect } from "react";
import axios from "axios";
import { LoginState } from "../store/loginState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";

export default function GetUserInfo(props) {

  const setLoginState = useSetRecoilState(LoginState);
  const navigate = useNavigate();
  
  const accessToken = window.localStorage.getItem('accessToken')
  const refrehsToken = window.localStorage.getItem('refreshToken')

  const authHeader = {"Authorization" : `Bearer ${accessToken}`}

  const getUserInfo = async () => {

    const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/auth/userinfo", {
      headers: authHeader,
    });

    if (res) {
      const { data } = res

      setLoginState(true);
      window.localStorage.setItem('userinfo', JSON.stringify(data))
      navigate("/myhome");
    }
  }

  useEffect(() => {

    getUserInfo()    

  
  }, [])
  return <></>;
}
