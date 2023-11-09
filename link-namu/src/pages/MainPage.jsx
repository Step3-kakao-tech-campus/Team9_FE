import cookies from "react-cookies";
import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import { useWorkspaceList } from "../hooks/useWorkspaceList";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const { workspaceData, isLoading, isError } = useWorkspaceList();

  if (!cookies.load("refreshToken")) {
    navigate("/signin");
  }

  return (
    <div>
      <BookmarkGridTemplate />
    </div>
  );
};

export default MainPage;
