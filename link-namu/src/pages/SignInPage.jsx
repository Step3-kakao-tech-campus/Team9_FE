import { GoogleOAuthProvider } from "@react-oauth/google";
import SignIn from "../components/atoms/SignIn";
const GOOGLE_ID = process.env.REACT_APP_GOOGLE_ID;

const SignInPage = () => {
  return (
    <>
      <div className="h-screen flex items-center bg-[#f4f4f4]">
        {GOOGLE_ID && (
          <GoogleOAuthProvider clientId={GOOGLE_ID}>
            <SignIn />
          </GoogleOAuthProvider>
        )}
      </div>
    </>
  );
};

export default SignInPage;
