import { useEffect } from "react";
import axios from "axios";

export default function GetUserInfo() {
  
  const accessToken = window.localStorage.getItem('accessToken')
  const refrehsToken = window.localStorage.getItem('refreshToken')

  const authHeader = {"Authorization" : `Bearer ${accessToken}`}

  const getUserInfo = async () => {

    const res = await axios.get("http://localhost:8080/auth/userinfo", {
      headers: authHeader,
    });

    if (res) {
      const { data } = res
    
      window.localStorage.setItem('userinfo', JSON.stringify(data))
      window.location.replace('/')
    }
  }

  useEffect(() => {

    getUserInfo()
  
  })
  return <></>;
}
