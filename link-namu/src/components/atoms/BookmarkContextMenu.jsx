import { useOpenModal } from "../../hooks/useOpenModal";
import { createCategoryShareLink } from "../../apis/share";

import ContextMenuItem from "./ContextMenuItem";
import MODAL_TYPES from "../../constants/modal_types";
import { printToast } from "../../utils/toast";

const BookmarkContextMenu = ({
  top,
  left,
  onClose,
  onAction,
  bookmarkId,
  handleRefetch,
}) => {
  const openModal = useOpenModal();

  const deleteBookmark = () => {
    console.log("deleteBookmark", bookmarkId);
    openModal({
      modalType: MODAL_TYPES.BookmarkDeleteModal,
      data: { bookmarkId: bookmarkId, handleRefetch: handleRefetch },
    });
  };

  const editBookmark = () => {
    console.log("editBookmark", bookmarkId);
    openModal({
      modalType: MODAL_TYPES.BookmarkEditModal,
      data: { bookmarkId: bookmarkId, handleRefetch: handleRefetch },
    });
  };

  const updateBookmarkImage = () => {
    console.log("editBookmarkImage", bookmarkId);
    openModal({
      modalType: MODAL_TYPES.BookmarkImageUpdateModal,
      data: { bookmarkId: bookmarkId, handleRefetch: handleRefetch },
    });
  };
  
  return (
    <div
      className="fixed z-50 bg-white border rounded shadow-md context-menu"
      style={{ top, left }}
      onClick={onClose}
    >
      <ContextMenuItem handleAction={() => onAction()}>닫기</ContextMenuItem>
      <hr />
      <ContextMenuItem handleAction={() => onAction(deleteBookmark())}>
        북마크 삭제
      </ContextMenuItem>
      <ContextMenuItem handleAction={() => onAction(editBookmark())}>
        북마크 수정
      </ContextMenuItem>
      <ContextMenuItem handleAction={() => onAction(updateBookmarkImage())}>
        이미지 변경
      </ContextMenuItem>
    </div>
  );
};

export default BookmarkContextMenu;
