import logoGoogle from "../../assets/google logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login } from "../../apis/user";
import { setToken } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // console.log(tokenResponse);
      const google_token = tokenResponse.access_token;

      login({ google_token }).then((res) => {
        console.log(res);
        const accessToken = res.data?.response?.accessToken.split(" ")[1];
        const refreshToken = res.data?.response?.refreshToken;
        dispatch(
          setToken({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        );
        console.log("access token:", accessToken);
        console.log("refresh token:", refreshToken);
        navigate("/");
      });
    },
    onError: () => {
      console.log("login failed");
    },
  });

  return (
    <div className="w-full h-screen">
      <div className="w-[500px] h-[400px] flex flex-col justify-center  mx-auto mt-[100px] bg-[#f4f4f4] border rounded-lg shadow-lg">
        <h1 className="block mb-[80px] text-lg font-medium text-center">
          로그인이 필요한 서비스입니다.
        </h1>
        <button
          onClick={googleSocialLogin}
          className="w-[396px] h-[40px] flex flex-row items-center mx-auto pl-2 rounded-sm shadow-sm bg-white"
        >
          <img
            src={logoGoogle}
            alt="google"
            className="w-[18px] h-[18px] inline-block mr-6"
          />
          <span className="text-sm">구글로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
