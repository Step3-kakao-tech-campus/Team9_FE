import { instance } from "./api";
import { getRefreshToken } from "../utils/auth";

/**
 * 구글 소셜 로그인
 * @param {string} param0
 * @returns
 */
export const login = ({ google_token }) => {
  return instance.post(
    "/api/auth/google/login",
    {},
    {
      headers: { Google: google_token },
    }
  );
};

/**
 * 로그아웃
 * @param {string} param0
 * @returns
 */
export const logout = () => {
  const refreshToken = getRefreshToken();
  return instance.post("/api/auth/logout", { refreshToken: refreshToken });
};

/**
 * 토큰 재발행
 * @param {string} param0
 * @returns
 */
export const reissue = () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.log("reissue: refresh token이 존재하지 않습니다.");
    return;
  }
  return instance.post("/api/auth/reissue", { refreshToken: refreshToken });
};

/**
 * 회원탈퇴
 * @returns
 */
export const withdrawal = () => {
  return instance.post("/api/auth/withdrawal");
};
