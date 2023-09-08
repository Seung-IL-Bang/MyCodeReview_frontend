import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [queryParams] = useSearchParams();

  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    navigate("/userinfo")
  });
  return <></>;
}
