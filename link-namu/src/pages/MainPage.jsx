import cookies from "react-cookies";
import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import { useDispatch, useSelector } from "react-redux";
import { reissue } from "../apis/user";
import { setToken } from "../store/slices/userSlice";
import { useEffect } from "react";
import { getWorkspaceList } from "../apis/workspace";
import { setWorkspaceList } from "../store/slices/workspaceSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

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
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!accessToken) return;
    getWorkspaceList().then((res) => {
      console.log(res);
      dispatch(setWorkspaceList({ workspaceList: res.data?.response }));
    });
  }, [accessToken]);

  return (
    <div>
      <BookmarkGridTemplate />
    </div>
  );
};

export default MainPage;
