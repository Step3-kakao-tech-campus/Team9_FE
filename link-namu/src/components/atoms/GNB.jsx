import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import dehaze from "../../assets/dehaze.png";
import Searchbar from "../atoms/Searchbar";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import { logo192 } from "../../constants/public_image";

const GNB = ({ setState }) => {
  const navigate = useNavigate();
  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    if (!cookies.load("refreshToken")) setIsCookie(false);
    else setIsCookie(true);
  }, []);

  return (
    <>
      <header className="m-0 p-0">
        <div className="fixed left-0 right-[60px] top-0 z-11000 border-b bg-white">
          <div className="w-full h-[56px] mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="w-[46px] h-[46px] rounded-[60px] shadow-md bg-white hover:bg-[#d9d9d9] duration-300"
                onClick={setState}
              >
                <div className="w-[30px] h-[30px] m-2">
                  <img
                    src={dehaze}
                    alt="open menubar button"
                    className="w-full h-full"
                  />
                </div>
              </button>
              <button
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
            {isCookie ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </header>
      <div className="space"></div>
    </>
  );
};

export default GNB;
