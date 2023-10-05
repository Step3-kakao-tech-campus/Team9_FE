import { instance } from "./api";

/**
 * 구글 소셜 로그인
 * @param {string} param0
 * @returns
 */
export const googleLogin = ({ google_token }) => {
  return instance.post(
    "/api/auth/google/login",
    {},
    {
      headers: { Google: google_token },
    }
  );
};
