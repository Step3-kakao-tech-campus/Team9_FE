import cookies from "react-cookies";
import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWorkspaceList } from "../apis/workspace";
import { setWorkspaceList } from "../store/slices/workspaceSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  if (!cookies.load("refreshToken")) {
    window.location.href = "/signin";
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
