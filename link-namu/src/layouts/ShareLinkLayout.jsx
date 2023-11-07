import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";

import Sidebar from "../components/atoms/Sidebar";

const ShareLinkLayout = () => {
  return (
    <>
      <div className="flex">
        <div className="flex-1 h-screen">
          <Scrollbars thumbSize={100}>
            <Outlet />
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default ShareLinkLayout;
