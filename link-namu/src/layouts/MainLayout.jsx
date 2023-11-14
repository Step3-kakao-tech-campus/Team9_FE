import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useState, Suspense } from "react";

import cookies from "react-cookies";
import Sidebar from "../components/atoms/Sidebar";
import GNB from "../components/atoms/GNB";
import Menubar from "../components/molecules/Menubar";
import Loader from "../components/atoms/Loader";
import DefaultGNB from "../components/atoms/DefaultGNB";
import LoginButton from "../components/atoms/LoginButton";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const refreshToken = cookies.load("refreshToken");

  return (
    <>
      <div className="w-full h-[56px]"></div>
      <div className="fixed top-[56px] left-0 right-0 bottom-0 flex mr-[60px] overflow-y-hidden">
        <div className={`${isOpen ? "w-[256px]" : "w-0"} duration-500`}>
          {refreshToken && <Menubar isOpen={isOpen} />}
        </div>
        <div className="flex-1 h-[100%]">
          <Suspense fallback={<Loader />}>
            {refreshToken ? (
              <Scrollbars thumbSize={100}>
                <Outlet />
              </Scrollbars>
            ) : (
              <Outlet />
            )}
          </Suspense>
        </div>
      </div>
      {refreshToken ? (
        <>
          <GNB
            setState={() => {
              setIsOpen(prev => !prev);
            }}
          />
          <Sidebar />
        </>
      ) : (
        <>
          <DefaultGNB>
            <div className="fixed right-10">
              <LoginButton />
            </div>
          </DefaultGNB>
        </>
      )}
    </>
  );
};

export default MainLayout;
