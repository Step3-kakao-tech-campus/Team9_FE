import { useState } from "react";

import SubCategoryContainer from "./SubCategoryContainer";

import homeIcon from "../../assets/Home.png";
import chevron_up from "../../assets/Chevron_up.png";
// import chevron_down from "../../assets/Chevron_down.png";

const MainCategoryItem = ({ title = "카테고리", icon }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="wrapper">
      <div
        className={`px-3 py-[10px] grid grid-cols-[20px,1fr,16px] gap-x-3 rounded-lg cursor-pointer hover:bg-[#f6f6f6] ${
          opened && "bg-[#f6f6f6]"
        }`}
        onClick={() => {
          setOpened(!opened);
        }}
      >
        <img className="w-[20px] h-[20px]" src={homeIcon} alt="" />
        <span className="text-[#5c5e64] text-sm leading-5">{title}</span>
        {opened && (
          <img className="w-[16px] h-[16px]" src={chevron_up} alt="" />
        )}
      </div>
      <div className="px-[12px] py-0">
        {opened && <SubCategoryContainer parentCategory={title} />}
      </div>
    </div>
  );
};

export default MainCategoryItem;
