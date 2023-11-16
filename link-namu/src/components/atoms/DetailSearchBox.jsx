import { useEffect, useState } from "react";
import { stringToTags } from "../../utils/stringToTags";

import SearchInputText from "./SearchInputText";
import SearchInputLabel from "./SearchInputLabel";
import Tag from "./Tag";

const DetailSearchBox = ({ changeHandler, clickHandler, isOpen }) => {
  const [bookmarkNameText, setBookmarkNameText] = useState("");
  const [bookmarkDescText, setBookmarkDescText] = useState("");
  const [bookmarkLinkText, setBookmarkLinkText] = useState("");
  const [workspaceNameText, setWorkspaceNameText] = useState("");
  const [tagText, setTagText] = useState("");

  const renderTags = () => {
    if (tagText.length === 0) return null;
    const words = stringToTags(tagText);
    return words.map((word, index) => (
      <span key={index} className="text-blue-500 mr-1">
        <Tag name={word} />
      </span>
    ));
  };
  const clearAll = () => {
    setBookmarkNameText("");
    setBookmarkDescText("");
    setBookmarkLinkText("");
    setWorkspaceNameText("");
    setTagText("");
  };
  useEffect(() => {
    changeHandler({
      bookmarkName: bookmarkNameText.trim(),
      bookmarkDescription: bookmarkDescText.trim(),
      bookmarkLink: bookmarkLinkText.trim(),
      workspaceName: workspaceNameText.trim(),
      tags: stringToTags(tagText),
    });
  }, [
    bookmarkNameText,
    bookmarkDescText,
    bookmarkLinkText,
    workspaceNameText,
    tagText,
    changeHandler,
  ]);

  return (
    <div
      className={`${
        isOpen ? "h-[350px] border" : "h-0"
      } w-full duration-500 overflow-hidden flex flex-col`}
    >
      <div>
        <div className="flex">
          {/* label 영역 */}
          <div className="w-[30%]">
            <SearchInputLabel htmlFor="bookmarkNameInput">
              북마크 제목
            </SearchInputLabel>
            <SearchInputLabel htmlFor="bookmarkDescriptionInput">
              북마크 설명
            </SearchInputLabel>
            <SearchInputLabel htmlFor="workspaceNameInput">
              워크스페이스 이름
            </SearchInputLabel>
            <SearchInputLabel htmlFor="bookmarkLinkInput">
              북마크 링크
            </SearchInputLabel>
            <SearchInputLabel htmlFor="tagInput">태그</SearchInputLabel>
          </div>
          {/* input 영역 */}
          <div className="w-[70%] flex flex-col">
            <SearchInputText
              id="bookmarkNameInput"
              value={bookmarkNameText}
              placeholder="북마크 제목 키워드"
              changeHandler={setBookmarkNameText}
            />
            <SearchInputText
              id="bookmarkDescriptionInput"
              value={bookmarkDescText}
              placeholder="북마크 설명 키워드"
              changeHandler={setBookmarkDescText}
            />
            <SearchInputText
              id="workspaceNameInput"
              value={workspaceNameText}
              placeholder="워크스페이스 이름 키워드"
              changeHandler={setWorkspaceNameText}
            />
            <SearchInputText
              id="bookmarkLinkInput"
              value={bookmarkLinkText}
              placeholder="북마크 링크 키워드"
              changeHandler={setBookmarkLinkText}
            />
            <SearchInputText
              id="tagInput"
              value={tagText}
              placeholder="태그는 공백으로 구분됩니다."
              changeHandler={setTagText}
            />
            {/* <div className="">{renderTags()}</div> */}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <button className="border px-5 py-2" onClick={clearAll}>
          초기화
        </button>
        <button className="border px-5 py-2" onClick={clickHandler}>
          해당 내용으로 검색
        </button>
      </div>
    </div>
  );
};

export default DetailSearchBox;
