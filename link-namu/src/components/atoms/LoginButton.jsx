import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/signin");
  };
  return (
    <button className="" onClick={handleLogin}>
      로그인
    </button>
  );
};

export default LoginButton;
