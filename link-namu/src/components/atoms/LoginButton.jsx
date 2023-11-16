import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <button className="" onClick={() => navigate("/signin")}>
      로그인
    </button>
  );
};

export default LoginButton;
