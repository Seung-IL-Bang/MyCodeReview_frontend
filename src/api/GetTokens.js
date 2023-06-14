import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const cookies = document.cookie.split(";");
  const prefix_a = "accessToken=";
  const prefix_r = " refreshToken=";

  const accessToken = cookies[0].substring(prefix_a.length);
  const refreshToken = cookies[1].substring(prefix_r.length);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    navigate("/userinfo")
  });
  return <></>;
}
