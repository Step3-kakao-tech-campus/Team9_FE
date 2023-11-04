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
  changeHandler = () => {},
}) => {
  const [bookmarkName, setBookmarkName] = useState(title);
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [data, setData] = useState({
    bookmarkName: bookmarkName,
    categoryId: categoryId,
    link: url,
  });

  useEffect(() => {
    changeHandler(data);
  }, [data]);

  useEffect(() => {
    setData({
      bookmarkName: bookmarkName,
      categoryId: categoryId,
      link: url,
    });
  }, [bookmarkName, categoryId]);

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
          value={bookmarkName}
          disabled={`${!checked ? "disabled" : ""}`}
          onChange={(e) => setBookmarkName(e.target.value)}
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
