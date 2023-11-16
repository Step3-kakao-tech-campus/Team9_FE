import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { printToast } from "../../utils/toast";

import magnifier from "../../assets/magnifier.png";
import xIcon from "../../assets/x.png";

/**
 * 검색창 컴포넌트
 * @param {string} width - 컴포넌트 가로 길이
 * @returns
 */
const Searchbar = ({ detailSearchButtonHandler }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchButtonRef = useRef(null);
  const [isFocused, setIsFocus] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setIsExtended(isFocused || text.length > 0);
  }, [text, isFocused]);

  const clearText = () => {
    setText("");
    inputRef.current.focus();
  };
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      searchButtonRef.current.click();
    }
  };

  const searchText = () => {
    if (!text) {
      printToast("검색할 키워드를 입력해주세요.", "error");
      return;
    }

    navigate("/search/result", {
      state: {
        bookmarkName: text,
      },
    });
  };

  return (
    <>
      <div title="검색창" className="flex gap-x-2">
        <div
          className={`w-[550px] h-[40px] pl-5 py-[10px] flex items-center border rounded-[50px] shadow-md ${
            isFocused && "shadow-[#729076]"
          }`}
        >
          <div>
            <img
              src={magnifier}
              alt="magnifier icon"
              className="w-[20px] h-[20px] "
            />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={text}
            placeholder="북마크 제목에서 검색"
            onChange={(e) => setText(e.target.value)}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            onKeyPress={handleEnterKeyPress}
            className={`block flex-grow ml-5 outline-none`}
          />
          {text.length > 0 && (
            <button
              className="block h-6 w-6 m-2 flex items-center justify-center rounded-full hover:bg-[#eeeeee]"
              onClick={clearText}
            >
              <div className="w-3 h-3">
                <img
                  src={xIcon}
                  alt="clear search text button"
                  className="block"
                />
              </div>
            </button>
          )}
          <button
            ref={searchButtonRef}
            className={`block h-[40px] px-5 border rounded-tr-full rounded-br-full`}
            onClick={searchText}
          >
            <span className="block text-sm">검색</span>
          </button>
        </div>
        <button className={`px-2`} onClick={detailSearchButtonHandler}>
          <span className="text-sm">상세 검색</span>
        </button>
      </div>
    </>
  );
};

export default Searchbar;
