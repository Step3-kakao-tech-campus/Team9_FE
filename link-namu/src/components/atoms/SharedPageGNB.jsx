import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const SharedPageGNB = () => {
  return (
    <>
      <header className="m-0 p-0">
        <div className="fixed left-0 right-0 top-0 z-11000 border-b bg-white">
          <div className="w-full h-[56px] mx-auto px-5 flex items-center justify-between">
            <div></div>
            <div className="flex items-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="px-4 text-center"
              >
                <span className="text-base font-medium">🎄 LinkNamu</span>
              </button>
            </div>
            <LoginButton />
            {/* <LogoutButton /> */}
          </div>
        </div>
      </header>
      <div className="space"></div>
    </>
  );
};

export default SharedPageGNB;
