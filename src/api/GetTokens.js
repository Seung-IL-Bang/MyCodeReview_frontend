import { useEffect } from 'react';

export default function Login() {

  const cookies = document.cookie.split(';')
  const prefix_a = "accessToken="
  const prefix_r = " refreshToken="

  const accessToken = cookies[0].substring(prefix_a.length)
  const refreshToken = cookies[1].substring(prefix_r.length)

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)

    window.location.replace("/userinfo");
  })
  return <></>;
}
