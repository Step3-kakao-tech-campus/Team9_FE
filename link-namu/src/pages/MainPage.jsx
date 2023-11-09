import cookies from "react-cookies";
import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import { useWorkspaceList } from "../hooks/useWorkspaceList";

const MainPage = () => {
  const { workspaceData, isLoading, isError } = useWorkspaceList();

  if (!cookies.load("refreshToken")) {
    window.location.href = "/signin";
  }

  return (
    <div>
      <BookmarkGridTemplate />
    </div>
  );
};

export default MainPage;
