import cookies from "react-cookies";
import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import { useDispatch, useSelector } from "react-redux";
import { reissue } from "../apis/user";
import { setToken } from "../store/slices/userSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  if (!accessToken) {
    if (!cookies.load("refreshToken")) {
      window.location.href = "/signin";
      return;
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
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <BookmarkGridTemplate />
    </div>
  );
};

export default MainPage;
