import { useNavigate } from "react-router-dom";
import { logo192 } from "../../constants/public_image";

const DefaultGNB = () => {
const DefaultGNB = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="m-0 p-0">
        <div className="fixed left-0 right-0 top-0 z-11000 border-b bg-white">
          <div className="w-full h-[56px] mx-auto px-5 flex items-center justify-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="px-4 flex gap-x-2 items-center"
              >
                <img src={logo192} alt="logo" className="w-5 h-5" />
                <span className="text-lg font-medium">LinkNamu</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </header>
      <div className="space"></div>
    </>
  );
};

export default DefaultGNB;
