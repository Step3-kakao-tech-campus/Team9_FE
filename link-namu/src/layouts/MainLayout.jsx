import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/atoms/Sidebar";
import Menubar from "../components/molecules/Menubar";

import dehaze from "../assets/dehaze.png";
import close from "../assets/x.png";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <div className="flex-1 h-screen">
          <Outlet />
        </div>
        <Sidebar />
      </div>
      {/* Menu */}
      <div
        className="w-[60px] h-[60px] m-[10px] fixed left-0 top-0 rounded-[60px] shadow-md cursor-pointer bg-white hover:bg-[#d9d9d9] duration-300"
        onClick={() => {
          setOpen(true);
        }}
      >
        <button className="w-[40px] h-[40px] m-[10px]">
          <img src={dehaze} alt="open menubar" className="w-full h-full" />
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-25"
            onClick={() => {
              setOpen(false);
            }}
          ></div>
          <Menubar />
          <div
            className="fixed top-0 left-[223px] w-[15px] h-[15px]"
            onClick={() => {
              setOpen(false);
            }}
          >
            <img src={close} alt="close menu" className="m-2" />
          </div>
        </>
      )}
    </>
  );
};

export default MainLayout;
