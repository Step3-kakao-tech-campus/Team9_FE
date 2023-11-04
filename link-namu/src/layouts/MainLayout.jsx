import { Outlet } from "react-router-dom";
import { useOpenModal } from "../hooks/useOpenModal";

import Sidebar from "../components/atoms/Sidebar";
import MODAL_TYPES from "../constants/modal_types";

import dehaze from "../assets/dehaze.png";

const MainLayout = () => {
  const openModal = useOpenModal();

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
          openModal({ modalType: MODAL_TYPES.Menubar });
        }}
      >
        <div className="w-[40px] h-[40px] m-[10px]">
          <img
            src={dehaze}
            alt="open menubar button"
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
