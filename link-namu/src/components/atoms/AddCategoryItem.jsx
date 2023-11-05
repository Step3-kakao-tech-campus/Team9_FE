import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrCategory } from "../../store/slices/bookmarkSlice";

const AddCategoryItem = ({ workspaceId }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className={`w-full px-3 py-2 grid grid-cols-[1fr,16px] gap-x3 border border-white hover:font-bold`}
      >
        <span className="text-xs leading-4 text-left">+ 카테고리 추가</span>
      </button>
    </div>
  );
};

export default AddCategoryItem;
