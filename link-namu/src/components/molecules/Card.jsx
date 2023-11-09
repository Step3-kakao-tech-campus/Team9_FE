import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Tag from "../atoms/Tag";

/**
 * 카드 컴포넌트
 * @param {string} imageUrl - 사진 URL
 * @param {string} imageAlt - 사진 대체 텍스트
 * @param {string} title - 북마크 제목
 * @param {string} description - 북마크 설명
 * @param {array<string>} tags - 태그 명 배열
 */
const Card = ({
  index = 0,
  dragId = "",
  bookmarkId = "",
  imageUrl = "",
  imageAlt = "",
  url = "",
  title = "",
  description = "",
  tags = [],
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const onClickHandler = () => {
    window.location.href = url;
  };

  return (
    <Draggable key={bookmarkId} draggableId={dragId} index={1}>
      {provided => (
        <div
          className={`transform bg-white border-2 rounded-md shadow-md w-72 h-80 hover:transition-transform hover:scale-105 hover:border hover:border-gray-300 hover:shadow-lg`}
          onMouseEnter={() => setIsDragging(true)}
          onMouseLeave={() => setIsDragging(false)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClickHandler}
        >
          {/* 이미지 영역 */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className="object-contain w-64 h-40 mx-auto my-1 rounded-sm"
          />

          {/* 내용 영역 */}
          <div className="px-4 py-4">
            <div className="mb-2 overflow-hidden text-xl font-bold text-ellipsis">
              {title}
            </div>
            <p className="overflow-hidden text-base text-gray-700 text-ellipsis">
              {description}
            </p>
          </div>

          {/* 꼬리 영역 */}
          <div className="px-2 py-2">
            {/* 태그 영역 */}
            <span className="inline-block w-[80%]">
              {tags.map((tag, index) => (
                <Tag key={index} name={tag.tagName} />
              ))}
            </span>
            {/* 버튼 영역 */}
            <span className="inline-block w-[20%]"></span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
