import axios from 'axios';

export async function callRefresh() {

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const tokens = {accessToken, refreshToken};

  const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/refreshPath", tokens);

  console.log("refresh Res: " + res)

  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
}


export function clearLocalStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userinfo');
}