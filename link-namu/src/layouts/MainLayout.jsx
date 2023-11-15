import { Outlet } from "react-router-dom";
import { useState, Suspense } from "react";

import Sidebar from "../components/atoms/Sidebar";
import GNB from "../components/atoms/GNB";
import Menubar from "../components/molecules/Menubar";
import Loader from "../components/atoms/Loader";
import Scrollbars from "react-custom-scrollbars-2";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="w-full h-[56px]"></div>
      <div className="fixed top-[56px] left-0 right-0 bottom-0 flex mr-[60px] overflow-y-hidden">
        <div className={`${isOpen ? "w-[256px]" : "w-0"} duration-500`}>
          <Menubar isOpen={isOpen} />
        </div>
        <div className="flex-1 h-[100%]">
          <Suspense fallback={<Loader />}>
            <Scrollbars thumbSize={100}>
              <Outlet />
            </Scrollbars>
          </Suspense>
        </div>
      </div>
      <GNB
        setState={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      <Sidebar />
    </>
  );
};

export default MainLayout;
