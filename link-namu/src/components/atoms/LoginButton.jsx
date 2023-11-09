const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "/signin";
  };
  return (
    <button className="" onClick={handleLogin}>
      로그인
    </button>
  );
};

export default LoginButton;
