import { useState } from "react";

import SubCategoryContainer from "./SubCategoryContainer";

// import chevron_down from "../../assets/Chevron_down.png";
import chevron_up from "../../assets/Chevron_up.png";

const SubCategoryItem = ({ title = "하위 카테고리" }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <div
        className={`px-3 py-2 grid grid-cols-[1fr,16px] gap-x3 rounded-lg cursor-pointer hover:bg-[#f6f6f6] ${
          opened && "bg-[#f6f6f6]"
        }`}
        onClick={() => setOpened(!opened)}
      >
        <span className="text-xs leading-4">{title}</span>
        <img src={opened ? chevron_up : ""} alt="" />
      </div>
      <div className="pl-[12px] py-0">
        {opened && <SubCategoryContainer parentCategory={title} />}
      </div>
    </div>
  );
};

export default SubCategoryItem;
