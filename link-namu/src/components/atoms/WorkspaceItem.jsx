import { useState } from "react";

import CategoryContainer from "./CategoryContainer";

import homeIcon from "../../assets/home.png";
import chevron_up from "../../assets/chevron_up.png";

const WorkspaceItem = ({
  workspaceId,
  workspaceName = "워크스페이스",
  categories, // 배열
  icon = { homeIcon },
}) => {
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
        <span className="text-[#5c5e64] text-sm leading-5">
          {workspaceName}
        </span>
        {opened && categories && (
          <img className="w-[16px] h-[16px]" src={chevron_up} alt="" />
        )}
      </div>
      <div className="px-[12px] py-0">
        {opened && categories && (
          <CategoryContainer
            workspaceId={workspaceId}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default WorkspaceItem;
