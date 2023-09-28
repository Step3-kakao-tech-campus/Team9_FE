import { Outlet } from "react-router-dom";
import Sidebar from "../components/atoms/Sidebar";
import Menubar from "../components/molecules/Menubar";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <Menubar />
      <Outlet />
    </>
  );
};

export default MainLayout;
