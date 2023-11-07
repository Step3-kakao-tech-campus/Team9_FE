import { useDispatch, useSelector } from "react-redux";
import { reissue } from "../apis/user";
import { setToken } from "../store/slices/userSlice";
import cookies from "react-cookies";

const useReissueToken = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  return ({ changeState }) => {
    if (!accessToken) {
      if (!cookies.load("refreshToken")) {
        window.location.href = "/signin";
      }

      reissue()
        .then((res) => {
          const accessToken = res.data?.response?.accessToken.split(" ")[1];
          const refreshToken = res.data?.response?.refreshToken;

          dispatch(
            setToken({
              accessToken: accessToken,
              refreshToken: refreshToken,
            })
          );
          console.log("토큰이 재발급되었습니다.", accessToken);
          changeState();
        })
        .catch((err) => console.log(err));
    }
  };
};

export { useReissueToken };
