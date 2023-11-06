import { useOpenModal } from "../../hooks/useOpenModal";
import { createWorkspaceShareLink } from "../../apis/share";

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

  const shareWorkspace = () => {
    console.log("shareWorkspace", workspaceId);

    createWorkspaceShareLink({ workspaceId: workspaceId })
      .then((res) => {
        console.log("workspace share link", res.data?.response);

        if (res?.status !== 200) {
          throw new Error(res.data?.error.message);
        }

        openModal({
          modalType: MODAL_TYPES.ShareLinkModal,
          data: { shareLink: res.data?.response },
        });
      })
      .catch((err) => {
        const msg = "[워크스페이스 공유 에러] " + err.message;
        alert(msg);
        console.log(msg);
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
      <ContextMenuItem handleAction={() => onAction(shareWorkspace())}>
        공유하기
      </ContextMenuItem>
    </div>
  );
};

export default WorkspaceContextMenu;