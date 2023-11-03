import WorkspaceSeleceBox from "./WorkspaceSelectBox";
import CategorySelectBox from "./CategorySelectBox";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

const BookmarkSelectItem = ({
  id,
  checked = false,
  handleCheckedChange,
  thumbnail = null,
  title = "북마크 제목",
  url = "",
}) => {
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  return (
    <div
      className={`grow flex flex-row gap-x-4 p-2 mb-1 border rounded-xl ${
        checked ? "bg-[#ecf8fc]" : "bg-[#ffffff]"
      }`}
    >
      <img
        src={thumbnail}
        alt="thumbnail"
        className="w-[50px] h-[50px] border"
      />
      <div className="grow">
        <input
          className="block w-full border"
          defaultValue={title}
          disabled={`${!checked ? "disabled" : ""}`}
        />
        <input readOnly defaultValue={url} className="w-full border-b" />
      </div>
      <div className="w-[200px]">
        <WorkspaceSeleceBox
          value={workspaceId}
          changeHandler={setWorkspaceId}
          isSlimType={true}
          disabled={!checked}
        />
        <CategorySelectBox
          workspaceId={workspaceId}
          value={categoryId}
          changeHandler={setCategoryId}
          isSlimType={true}
          disabled={!checked}
        />
      </div>
      <Checkbox id={id} checked={checked} onChange={handleCheckedChange} />
    </div>
  );
};

export default BookmarkSelectItem;
