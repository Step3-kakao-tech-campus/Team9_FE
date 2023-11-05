import { useOpenModal } from "../../hooks/useOpenModal";

import ContextMenuItem from "./ContextMenuItem";
import MODAL_TYPES from "../../constants/modal_types";

const WorkspaceContextMenu = ({
  top,
  left,
  onClose,
  onAction,
  workspaceId,
}) => {
  const openModal = useOpenModal();

  const deleteWorkspace = () => {
    console.log("deleteWorkspace", workspaceId);
    openModal({
      modalType: MODAL_TYPES.WorkspaceDeleteModal,
      data: { workspaceId: workspaceId },
    });
  };
  return (
    <div
      className="context-menu fixed border bg-white rounded shadow-md"
      style={{ top, left }}
      onClick={onClose}
    >
      <ContextMenuItem handleAction={() => onAction()}>닫기</ContextMenuItem>
      <hr />
      <ContextMenuItem handleAction={() => onAction(deleteWorkspace())}>
        삭제
      </ContextMenuItem>
    </div>
  );
};

export default WorkspaceContextMenu;
