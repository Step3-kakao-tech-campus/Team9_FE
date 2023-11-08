import { useState, useRef } from "react";

import CategoryContainer from "./CategoryContainer";
import WorkspaceContextMenu from "./WorkspaceContextMenu";

import homeIcon from "../../assets/home.png";
import chevron_up from "../../assets/chevron_up.png";

/**
 * 메뉴바에서 워크스페이스 아이템을 나타내는 컴포넌트
 * @param {number} workspaceId - 워크스페이스 ID
 * @param {string} workspacename - 워크스페이스 이름
 * @param {array} categories - 카테고리 리스트
 * @returns
 */
const WorkspaceItem = ({
  workspaceId,
  workspaceName = "워크스페이스",
  categories,
}) => {
  const [opened, setOpened] = useState(false);
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const icon = homeIcon;

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    setContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };
  const handleContextMenuAction = (action) => {
    console.log("Selected action:", action);
    closeContextMenu();
  };

  return (
    <div className="wrapper">
      {isContextMenuVisible && (
        <WorkspaceContextMenu
          top={contextMenuPosition.top}
          left={contextMenuPosition.left}
          onClose={closeContextMenu}
          onAction={handleContextMenuAction}
          workspaceId={workspaceId}
        />
      )}
      <button
        title={workspaceName}
        className={`w-full text-left px-3 py-[10px] grid grid-cols-[20px,1fr,16px] gap-x-3 rounded-lg cursor-pointer hover:bg-[#f6f6f6]`}
        onClick={() => {
          setOpened(!opened);
        }}
        onContextMenu={handleContextMenu}
      >
        <img className="w-[20px] h-[20px]" src={icon} alt="" />
        <span className="text-[#5c5e64] text-sm leading-5 truncate">
          {workspaceName}
        </span>
        {opened && categories && (
          <img className="w-[16px] h-[16px]" src={chevron_up} alt="" />
        )}
      </button>
      <div className="pl-[12px] py-0">
        {opened && categories && (
          <CategoryContainer
            workspaceId={workspaceId}
            workspaceName={workspaceName}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default WorkspaceItem;
