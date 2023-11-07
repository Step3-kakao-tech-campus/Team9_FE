import WorkspaceItem from "../atoms/WorkspaceItem";
import { useSelector } from "react-redux";
import { selectWorkspaceList } from "../../store/slices/workspaceSlice";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useEffect } from "react";

const Menubar = ({ isOpen }) => {
  const { workspaceList } = useSelector(selectWorkspaceList);

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);
  return (
    <div>
      <div
        className={`${
          isOpen ? "w-[256px]" : "w-0"
        } duration-500 h-screen fixed left-0 top-0 flex flex-col border-r border-[#d9d9d9] bg-white`}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="h-[58px]"></div>
        <div className={`flex-grow p-6`}>
          <span
            className={`${
              !isOpen && "invisible"
            } text-[#5c5e64] text-[10px] font-medium leading-3 pl-3`}
          >
            MAIN
          </span>
          <Scrollbars thumbSize={100} autoHide>
            <div className="h-[500px] max-h-[500px]">
              {workspaceList &&
                workspaceList.map((workspace, index) => {
                  return (
                    <WorkspaceItem
                      key={index}
                      workspaceId={workspace.workspaceId}
                      workspaceName={workspace.workspaceName}
                      categories={workspace.categoryList}
                    />
                  );
                })}
            </div>
          </Scrollbars>
        </div>
        <div className="">
          <button
            onClick={() => {}}
            className="block w-[75%] h-[36px] mx-auto my-5 border border-[#d9d9d9] rounded-md overflow-hidden"
          >
            <span className="whitespace-nowrap">워크스페이스 추가</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
