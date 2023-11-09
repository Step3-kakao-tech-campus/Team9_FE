import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";

import SharedPageGNB from "../components/atoms/SharedPageGNB";

const ShareLinkLayout = () => {
  return (
    <>
      <div className="w-full h-[56px]"></div>
      <div className="fixed top-[56px] left-0 right-0 bottom-0 flex">
        <div className="flex-1 h-[100%]">
          <Scrollbars thumbSize={100}>
            <Outlet />
          </Scrollbars>
        </div>
      </div>
      <SharedPageGNB />
    </>
  );
};

export default ShareLinkLayout;
