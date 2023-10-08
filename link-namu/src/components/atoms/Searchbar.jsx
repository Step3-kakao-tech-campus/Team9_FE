import { useState } from "react";
import magnifier from "../../assets/Magnifier.png";

/**
 * 검색창 컴포넌트
 * @param {string} param0
 * @returns
 */
const Searchbar = ({ width = "700px" }) => {
  const [isFocused, setIsFocus] = useState(false);

  return (
    <div
      className={`w-[${width}] h-[50px] px-[20px] py-[10px] flex border border-black rounded-[50px] shadow-md`}
    >
      <div>
        <img
          src={magnifier}
          alt="magnifier icon"
          className="w-[30px] h-[30px] "
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
