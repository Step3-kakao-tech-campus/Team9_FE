import cookies from "react-cookies";
import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";

const MainPage = () => {
  if (!cookies.load("accessToken")) {
    window.location.href = "/signin";
    return;
  }

  return (
    <div>
      <BookmarkGridTemplate />
    </div>
  );
};

export default MainPage;
