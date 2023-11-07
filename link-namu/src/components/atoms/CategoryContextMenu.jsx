import { useOpenModal } from "../../hooks/useOpenModal";
import { createCategoryShareLink } from "../../apis/share";

import ContextMenuItem from "./ContextMenuItem";
import MODAL_TYPES from "../../constants/modal_types";

const CategoryContextMenu = ({
  top,
  left,
  onClose,
  onAction,
  workspaceId,
  categoryId,
}) => {
  const openModal = useOpenModal();

  const deleteCategory = () => {
    console.log("deleteCategory", categoryId);
    openModal({
      modalType: MODAL_TYPES.CategoryDeleteModal,
      data: { categoryId: categoryId },
    });
  };
  const addBookmark = () => {
    console.log("addBookmark", categoryId);
    openModal({
      modalType: MODAL_TYPES.BookmarkAddModal,
      data: { workspaceId: workspaceId, categoryId: categoryId },
    });
  };
  const shareCategory = () => {
    console.log("shareCategory", categoryId);

    createCategoryShareLink({ categoryId: categoryId })
      .then((res) => {
        console.log("category share link", res.data?.response);

        if (res?.status !== 200) {
          throw new Error(res.data?.error.message);
        }

        // api 수정 후 변경할 부분 //////////////
        const originLink = res.data?.response;
        const path = originLink.replace("https://www.linknamu.com", "");
        /////////////////////////////

        const currentOrigin = window.location.origin;
        const shareLink = currentOrigin + path;

        openModal({
          modalType: MODAL_TYPES.ShareLinkModal,
          data: { shareLink: shareLink },
        });
      })
      .catch((err) => {
        const msg = "[카테고리 공유 에러] " + err.message;
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
      <ContextMenuItem handleAction={() => onAction(deleteCategory())}>
        삭제
      </ContextMenuItem>
      <ContextMenuItem handleAction={() => onAction(addBookmark())}>
        북마크 추가
      </ContextMenuItem>
      <ContextMenuItem handleAction={() => onAction(shareCategory())}>
        공유하기
      </ContextMenuItem>
    </div>
  );
};

export default CategoryContextMenu;
