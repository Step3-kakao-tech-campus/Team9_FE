import MODAL_TYPES from "../../constants/modal_types";
import { useOpenModal } from "../../hooks/useOpenModal";

const AddCategoryItem = ({ workspaceId }) => {
  const openModal = useOpenModal();

  return (
    <div>
      <button
        title="카테고리 추가하기"
        className={`w-full px-3 py-2 grid grid-cols-[1fr,16px] gap-x3 border border-white hover:font-bold`}
        onClick={() =>
          openModal({
            modalType: MODAL_TYPES.CategoryAddModal,
            data: { workspaceId: workspaceId },
          })
        }
      >
        <span className="text-xs leading-4 text-left whitespace-nowrap">
          + 카테고리 추가
        </span>
      </button>
    </div>
  );
};

export default AddCategoryItem;
