import cookies from "react-cookies";

const TOKEN_TYPE = {
  REFRESH_TOKEN: "RefreshToken",
  ACCESS_TOKEN: "AccessToken",
};

const saveTokensToCookie = ({ refreshToken, accessToken }) => {
  // refresh token의 만료 기간(2주)
  const refreshExpires = new Date();
  refreshExpires.setDate(refreshExpires.getDate() + 14);

  cookies.save(TOKEN_TYPE.REFRESH_TOKEN, refreshToken, {
    path: "/",
    expires: refreshExpires,
    secure: true,
    // httpOnly: true,
  });

  // access token의 만료 기간 (30분)
  const accessExpires = new Date();
  accessExpires.setMinutes(accessExpires.getMinutes() + 29 * 60 * 1000); // 혹시 몰라서 29분..

  // for test (30초)
  // accessExpires.setSeconds(accessExpires.getSeconds() + 30);

  cookies.save(TOKEN_TYPE.ACCESS_TOKEN, accessToken, {
    path: "/",
    expires: accessExpires,
    secure: true,
    // httpOnly: true,
  });
};

const getRefreshToken = () => {
  const refreshToken = cookies.load(TOKEN_TYPE.REFRESH_TOKEN);
  return refreshToken;
};
const getAccessToken = () => {
  const accessToken = cookies.load(TOKEN_TYPE.ACCESS_TOKEN);
  return accessToken;
};

const removeTokens = () => {
  cookies.remove(TOKEN_TYPE.REFRESH_TOKEN, { path: "/" });
  cookies.remove(TOKEN_TYPE.ACCESS_TOKEN, { path: "/" });
};

const hasAccessToken = () => {
  return !!getAccessToken();
};
const hasRefreshToken = () => {
  return !!getRefreshToken();
};

export {
  saveTokensToCookie,
  getRefreshToken,
  getAccessToken,
  removeTokens,
  hasAccessToken,
  hasRefreshToken,
};
