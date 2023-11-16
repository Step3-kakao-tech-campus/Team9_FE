import addBookmark from "../../assets/add_bookmark.png";
import MODAL_TYPES from "../../constants/modal_types";
import { useOpenModal } from "../../hooks/useOpenModal";

const AddCard = ({ categoryId, handleRefetch }) => {
  const openModal = useOpenModal();

  return (
    <button
      title="현재 카테고리에 북마크 추가하기"
      className={`transform flex flex-col bg-white border-2 rounded-md shadow-md w-72 h-80 hover:bg-gray-100 hover:border hover:border-gray-300 hover:shadow-lg`}
      onClick={() =>
        openModal({
          modalType: MODAL_TYPES.BookmarkAddModal,
          data: { categoryId: categoryId, handleRefetch: handleRefetch },
        })
      }
    >
      <img
        src={addBookmark}
        alt="Add Bookmark"
        className="object-cover w-32 h-32 p-4 m-4 mx-auto my-1 mt-12 rounded-sm"
      />
      <div className="px-4 py-4 mx-auto">
        <div className="mb-2 overflow-hidden text-xl font-bold text-ellipsis">
          북마크 추가하기
        </div>
      </div>
    </button>
  );
};

export default AddCard;
