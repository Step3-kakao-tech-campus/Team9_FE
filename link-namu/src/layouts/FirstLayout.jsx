import { Outlet } from "react-router-dom";

import DefaultGNB from "../components/atoms/DefaultGNB";

const FirstLayout = () => {
  return (
    <>
      <div className="w-full h-[56px]"></div>
      <div className="fixed top-[56px] left-0 right-0 bottom-0 flex">
        <div className="flex-1 h-[100%]">
          <Outlet />
        </div>
      </div>
      <DefaultGNB showLoginButton={true} />
    </>
  );
};

export default FirstLayout;
