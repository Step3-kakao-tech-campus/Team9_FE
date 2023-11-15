import logoGoogle from "../../assets/google_logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login } from "../../apis/user";
import { refresh } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { saveTokensToCookie } from "../../utils/auth";

import { logo192 } from "../../constants/public_image";

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

        saveTokensToCookie({ refreshToken, accessToken });
        dispatch(refresh());

        navigate("/");
      });
    },
    onError: () => {
      console.log("login failed");
    },
  });

  return (
    <div className="w-[600px] h-[500px] mx-auto py-32 flex flex-col justify-around rounded-xl border text-center bg-white shadow-lg">
      <div>
        <div className="flex items-center justify-center gap-x-2">
          <img src={logo192} className="w-10 h-10" alt="logo" />
          <h1 className="inline-block text-[250%] font-medium text-center">
            LinkNamu
          </h1>
        </div>
        <p>로그인이 필요한 서비스입니다.</p>
      </div>
      <button
        onClick={googleSocialLogin}
        className="w-[396px] h-[40px] flex flex-row items-center mx-auto pl-2 border rounded-sm shadow-lg bg-white"
      >
        <img
          src={logoGoogle}
          alt="google"
          className="w-[18px] h-[18px] inline-block mr-6"
        />
        <span className="text-sm">구글로 로그인</span>
      </button>
    </div>
  );
};

export default SignIn;
