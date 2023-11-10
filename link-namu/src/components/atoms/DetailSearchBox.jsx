import { useEffect, useState } from "react";

import SearchInputText from "./SearchInputText";
import SearchInputLabel from "./SearchInputLabel";
import Tag from "./Tag";

const DetailSearchBox = ({ value, changeHandler, clickHandler }) => {
  const [bookmarkNameText, setBookmarkNameText] = useState("");
  const [bookmarkDescText, setBookmarkDescText] = useState("");
  const [bookmarkLinkText, setBookmarkLinkText] = useState("");
  const [workspaceNameText, setWorkspaceNameText] = useState("");
  const [tagText, setTagText] = useState("");

  const getTagList = (text) => {
    return text.split(/\s+/).filter((tag) => tag.trim() !== "");
  };
  const renderHashtags = () => {
    if (tagText.length === 0) return null;
    const words = tagText.split(/\s+/); // 공백을 기준으로 단어 분리
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
      tags: getTagList(tagText.trim()), // 태그는 배열로 받도록 변경
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
    <div className="flex flex-col border">
      <div className="flex-1 flex flex-col">
        <div>
          <SearchInputLabel htmlFor="bookmarkNameInput">
            북마크 제목
          </SearchInputLabel>
          <SearchInputText
            id="bookmarkNameInput"
            value={bookmarkNameText}
            changeHandler={setBookmarkNameText}
          />
        </div>
        <div>
          <SearchInputLabel htmlFor="bookmarkDescriptionInput">
            북마크 설명
          </SearchInputLabel>
          <SearchInputText
            id="bookmarkDescriptionInput"
            value={bookmarkDescText}
            changeHandler={setBookmarkDescText}
          />
        </div>
        <div>
          <SearchInputLabel htmlFor="workspaceNameInput">
            워크스페이스 이름
          </SearchInputLabel>
          <SearchInputText
            id="workspaceNameInput"
            value={workspaceNameText}
            changeHandler={setWorkspaceNameText}
          />
        </div>
        <div>
          <SearchInputLabel htmlFor="bookmarkLinkInput">
            북마크 링크
          </SearchInputLabel>
          <SearchInputText
            id="bookmarkLinkInput"
            value={bookmarkLinkText}
            changeHandler={setBookmarkLinkText}
          />
        </div>
        <div>
          <SearchInputLabel>태그</SearchInputLabel>
          <SearchInputText
            id="tagInput"
            value={tagText}
            changeHandler={setTagText}
          />
          <div className="">{renderHashtags()}</div>
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
