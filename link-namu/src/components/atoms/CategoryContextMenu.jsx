import { useOpenModal } from "../../hooks/useOpenModal";

import ContextMenuItem from "./ContextMenuItem";
import MODAL_TYPES from "../../constants/modal_types";

const CategoryContextMenu = ({ top, left, onClose, onAction, categoryId }) => {
  const openModal = useOpenModal();

  const deleteCategory = () => {
    console.log("deleteCategory", categoryId);
    openModal({
      modalType: MODAL_TYPES.CategoryDeleteModal,
      data: { categoryId: categoryId },
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
    </div>
  );
};

export default CategoryContextMenu;
