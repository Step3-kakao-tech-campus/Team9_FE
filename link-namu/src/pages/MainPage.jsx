import cookies from "react-cookies";
import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import { useWorkspaceList } from "../hooks/useWorkspaceList";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../components/atoms/Loader";

const MainPage = () => {
  const navigate = useNavigate();
  const { workspaceData, isLoading, isError } = useWorkspaceList();

  if (!cookies.load("refreshToken")) {
    navigate("/signin");
  }

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <BookmarkGridTemplate />
      </Suspense>
    </div>
  );
};

export default MainPage;
