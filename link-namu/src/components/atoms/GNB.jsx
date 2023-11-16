import { useNavigate } from "react-router-dom";
import dehaze from "../../assets/dehaze.png";
import Searchbar from "../atoms/Searchbar";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { logo192 } from "../../constants/public_image";
import { getRefreshToken } from "../../utils/auth";

const GNB = ({ setState }) => {
  const navigate = useNavigate();
  const refreshToken = getRefreshToken();

  return (
    <>
      <header className="m-0 p-0">
        <div className="fixed left-0 right-[60px] top-0 z-11000 border-b bg-white">
          <div className="w-full h-[56px] mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                title="메뉴바 열기/닫기"
                className="w-[46px] h-[46px] rounded-[60px] shadow-md bg-white hover:bg-[#d9d9d9] duration-300"
                onClick={setState}
              >
                <div className="w-[30px] h-[30px] m-2">
                  <img
                    src={dehaze}
                    alt="메뉴바 열기/닫기 버튼"
                    className="w-full h-full"
                  />
                </div>
              </button>
              <button
                title="LinkNamu 홈으로 이동"
                onClick={() => navigate("/")}
                className="px-4 flex gap-x-2 items-center"
              >
                <img src={logo192} alt="logo" className="w-5 h-5" />
                <span className="text-lg font-medium">LinkNamu</span>
              </button>
            </div>
            <Searchbar
              detailSearchButtonHandler={() => {
                navigate("/search/result");
              }}
            />
            {refreshToken ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </header>
      <div className="space"></div>
    </>
  );
};

export default GNB;
