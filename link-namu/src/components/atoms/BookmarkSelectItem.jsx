import WorkspaceSeleceBox from "./WorkspaceSelectBox";
import CategorySelectBox from "./CategorySelectBox";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import default_image from "../../assets/default_image.png";

const BookmarkSelectItem = ({
  id,
  checked = false,
  handleCheckedChange,
  title,
  url = "",
  imageUrl = "",
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
      // categoryId: categoryId,
      link: url,
      imageUrl: imageUrl,
    });
  }, [bookmarkName]);

  return (
    <div
      className={`grow flex flex-row items-center gap-x-3 px-3 py-3 mr-3 mb-1 border rounded-xl ${
        checked ? "bg-[#ecf8fc]" : "bg-[#ffffff]"
      }`}
    >
      <div className="h-20 w-32 overflow-hidden flex items-center justify-center rounded-xl border bg-white hover:translate-x-14 hover:translate-y-10 hover:scale-[2]">
        <img
          src={imageUrl !== "" ? imageUrl : default_image}
          alt={`thumbnail of ${bookmarkName}`}
          className="block h-full"
        />
      </div>
      <div className="grow">
        <input
          className="block w-full border mb-3"
          value={bookmarkName}
          // disabled={`${!checked ? "disabled" : ""}`}
          onChange={(e) => setBookmarkName(e.target.value)}
        />
        <input
          readOnly
          defaultValue={url}
          className="w-full border bg-transparent"
        />
      </div>
      {/* <div className="w-[200px]">
        <WorkspaceSeleceBox
          value={workspaceId}
          changeHandler={setWorkspaceId}
          isSlimType={true}
          // disabled={!checked}
        />
        <CategorySelectBox
          workspaceId={workspaceId}
          value={categoryId}
          changeHandler={setCategoryId}
          isSlimType={true}
          // disabled={!checked}
        />
      </div> */}
      <div className="px-5">
        <Checkbox id={id} checked={checked} onChange={handleCheckedChange} />
      </div>
    </div>
  );
};

export default BookmarkSelectItem;
