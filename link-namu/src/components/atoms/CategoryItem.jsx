import { useDispatch, useSelector } from "react-redux";

import { setCurrCategory } from "../../store/slices/bookmarkSlice";
/**
 * 개별 카테고리 아이템을 나타내는 컴포넌트
 * @param {number} categoryId - 카테고리 ID
 * @param {string} categoryName - 카테고리 이름
 * @returns
 */
const CategoryItem = ({ categoryId, categoryName = "하위 카테고리" }) => {
  const dispatch = useDispatch();
  const currCategoryId = useSelector((state) => {
    return state.bookmark.currCategoryId;
  });

  return (
    <button
      title={categoryName}
      className={`w-full pl-3 py-2 grid grid-cols-[1fr,16px] gap-x3 rounded-lg text-left ${
        categoryId === currCategoryId && "bg-[#f6f6f6]"
      } hover:bg-[#f6f6f6]`}
      onClick={() => {
        dispatch(
          setCurrCategory({
            categoryId: categoryId,
            categoryName: categoryName,
          })
        );
      }}
    >
      <span className="text-xs leading-4 truncate">{categoryName}</span>
    </button>
  );
};

export default CategoryItem;
