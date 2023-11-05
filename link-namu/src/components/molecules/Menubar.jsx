import WorkspaceItem from "../atoms/WorkspaceItem";
import { useSelector } from "react-redux";
import { selectWorkspaceList } from "../../store/slices/workspaceSlice";
import { useOpenModal } from "../../hooks/useOpenModal";
import { Scrollbars } from "react-custom-scrollbars-2";

import MODAL_TYPES from "../../constants/modal_types";
import ModalCloseButton from "../atoms/ModalCloseButton";

const Menubar = () => {
  const openModal = useOpenModal();
  const { workspaceList } = useSelector(selectWorkspaceList);

  return (
    <>
      <div
        className="w-[256px] h-screen fixed left-0 top-0 flex flex-col border border-[#d9d9d9] bg-white rounded-r-lg"
        onContextMenu={(e) => e.preventDefault()}
      >
        <ModalCloseButton />
        <div className="p-6 border-b border-[#d9d9d9] text-center">
          <span className="text-base font-medium">🎄 LinkNamu</span>
        </div>
        <div className="flex-grow p-6">
          <span
            className={"text-[#5c5e64] text-[10px] font-medium leading-3 pl-3"}
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
            onClick={() =>
              openModal({ modalType: MODAL_TYPES.WorkspaceAddModal })
            }
            className="block w-[190px] h-[36px] mx-auto my-5 border border-[#d9d9d9] rounded-md"
          >
            워크스페이스 추가
          </button>
        </div>
      </div>
    </>
  );
};

export default Menubar;
