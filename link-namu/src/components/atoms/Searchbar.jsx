import { useState } from "react";
import magnifier from "../../assets/magnifier.png";

/**
 * 검색창 컴포넌트
 * @param {string} width - 컴포넌트 가로 길이
 * @returns
 */
const Searchbar = ({ width = 600 }) => {
  const [isFocused, setIsFocus] = useState(false);

  return (
    <div
      className={`w-[${width}px] h-[40px] px-[20px] py-[10px] flex border rounded-[50px] shadow-md`}
    >
      <div>
        <img
          src={magnifier}
          alt="magnifier icon"
          className="w-[20px] h-[20px] "
        />
      </div>
      <input
        type="text"
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        className={`block flex-grow ml-[20px] outline-none border-black ${
          isFocused && "border-b-[1px]"
        }`}
      />
    </div>
  );
};

export default Searchbar;
