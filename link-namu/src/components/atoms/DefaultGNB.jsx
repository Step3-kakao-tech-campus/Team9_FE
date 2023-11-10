import { useNavigate } from "react-router-dom";

const DefaultGNB = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="m-0 p-0">
        <div className="fixed left-0 right-0 top-0 z-11000 border-b bg-white">
          <div className="w-full h-[56px] mx-auto px-5 flex items-center justify-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="px-4 text-center"
              >
                <span className="text-base font-medium">🎄 LinkNamu</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="space"></div>
    </>
  );
};

export default DefaultGNB;
