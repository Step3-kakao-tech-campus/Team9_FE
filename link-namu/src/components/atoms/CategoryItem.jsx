import { useState } from "react";

const CategoryItem = ({ categoryId, categoryName = "하위 카테고리" }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <div
        className={`px-3 py-2 grid grid-cols-[1fr,16px] gap-x3 rounded-lg cursor-pointer hover:bg-[#f6f6f6]`}
        onClick={() => setOpened(!opened)}
      >
        <span className="text-xs leading-4">{categoryName}</span>
      </div>
    </div>
  );
};

export default CategoryItem;
