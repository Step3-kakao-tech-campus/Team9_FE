import cookies from "react-cookies";

const MainPage = () => {
  if (!cookies.load("accessToken")) {
    window.location.href = "/signin";
    return;
  }

  return <div>main page</div>;
};

export default MainPage;
