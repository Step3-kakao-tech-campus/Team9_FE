import { useState } from "react";
import Tag from "../atoms/Tag";

/**
 * 기본 카드 컴포넌트
 * @param {string} imageUrl - 사진 URL
 * @param {string} imageAlt - 사진 대체 텍스트
 * @param {string} title - 북마크 제목
 * @param {string} description - 북마크 설명
 * @param {array<string>} tags - 태그 명 배열
 */
const NonDraggableCard = ({
  imageUrl = "",
  imageAlt = "",
  url = "",
  title = "",
  description = "",
  tags = [],
}) => {
  const [isHover, setIsHover] = useState(false);

  const onClickHandler = () => {
    window.open(url);
  };

  return (
    <div
      className={`transform bg-white border-2 rounded-md shadow-md w-72 h-80 
    ${
      isHover &&
      `transition-transform scale-105 border border-gray-300 shadow-lg z-30 flex flex-col h-auto min-h-[20rem] cursor-pointer`
    }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClickHandler}
    >
      {/* 이미지 영역 */}
      <img
        src={imageUrl}
        alt={imageAlt}
        className="object-contain w-64 mx-auto my-2 h-36"
      />

      {/* 내용 영역 */}
      <div className="px-4 py-2">
        <p
          className={`mb-2 overflow-hidden font-bold break-all text-md text-ellipsis whitespace-nowrap ${
            isHover && `overflow-normal text-clip whitespace-break-spaces`
          }`}
        >
          {title}
        </p>
        <hr />
        <p
          className={`mt-2 overflow-hidden text-sm text-gray-700 break-all whitespace-normal text-ellipsis line-clamp-2 
              ${isHover && `overflow-normal line-clamp-none text-clip`}`}
        >
          {description}
        </p>
      </div>

      {/* 꼬리 영역 */}
      <div
        className={`px-2 py-2 overflow-hidden w-[90%]
            ${isHover && `overflow-normal`}`}
      >
        {/* 태그 영역 */}
        <span
          className={`flex w-full
            ${isHover && `flex-wrap`}`}
        >
          {tags.map((tag, index) => (
            <Tag key={index} name={tag.tagName} isHover={isHover} />
          ))}
        </span>
        {/* 버튼 영역 */}
        {/* <span className="inline-block w-[20%]"></span> */}
      </div>
    </div>
  );
};

export default NonDraggableCard;
