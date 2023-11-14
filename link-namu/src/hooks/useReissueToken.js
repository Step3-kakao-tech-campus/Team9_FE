import { useDispatch } from "react-redux";
import { reissue } from "../apis/user";
import { setToken } from "../store/slices/userSlice";
import cookies from "react-cookies";

const useReissueToken = () => {
  const dispatch = useDispatch();

  return () => {
    // refreshToken 만료 시, 로그인 페이지로 이동
    if (!cookies.load("refreshToken")) {
      window.location.href = "/signin";
    }

    // refreshToken 만료되지 않았다면, 토큰 재발급 요청
    reissue()
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }

        const accessToken = res.data?.response?.accessToken.split(" ")[1];
        const refreshToken = res.data?.response?.refreshToken;

        dispatch(
          setToken({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        );
        console.log("토큰이 재발급되었습니다.", accessToken);
      })
      .catch((err) => console.log(err));
  };
};

export { useReissueToken };
