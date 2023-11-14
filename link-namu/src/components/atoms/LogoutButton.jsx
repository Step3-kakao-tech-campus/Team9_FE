import { useNavigate } from "react-router-dom";
import { logout } from "../../apis/user";
import cookies from "react-cookies";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);
        cookies.remove("refreshToken", { path: "/" });
        cookies.remove("accessToken", { path: "/" });
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <button className="" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
