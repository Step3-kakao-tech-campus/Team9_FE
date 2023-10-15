import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrCategory } from "../../store/slices/bookmarkSlice";
/**
 * 개별 카테고리 아이템을 나타내는 컴포넌트
 * @param {number} categoryId - 카테고리 ID
 * @param {string} categoryName - 카테고리 이름
 * @returns
 */
const CategoryItem = ({ categoryId, categoryName = "하위 카테고리" }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div
        className={`px-3 py-2 grid grid-cols-[1fr,16px] gap-x3 rounded-lg cursor-pointer hover:bg-[#f6f6f6]`}
        onClick={() => {
          dispatch(
            setCurrCategory({
              categoryId: categoryId,
              categoryName: categoryName,
            })
          );
        }}
      >
        <span className="text-xs leading-4">{categoryName}</span>
      </div>
    </div>
  );
};

export default CategoryItem;
