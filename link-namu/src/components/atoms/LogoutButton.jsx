import { useNavigate } from "react-router-dom";
import { logout } from "../../apis/user";
import { removeTokens } from "../../utils/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);

        removeTokens();
        navigate("/first");
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
