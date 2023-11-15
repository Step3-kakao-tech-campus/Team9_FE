import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Tag from "../atoms/Tag";
import BookmarkContextMenu from "../atoms/BookmarkContextMenu";

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
  handleRefetch,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    setContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleContextMenuAction = (action) => {
    console.log("Selected action:", action);
    closeContextMenu();
  };

  const onClickHandler = () => {
    window.open(url);
  };

  useEffect(() => {
    if (isContextMenuVisible) {
      window.addEventListener("click", closeContextMenu);
      setTimeout(
        () => window.addEventListener("contextmenu", closeContextMenu),
        100
      );
    }

    return () => {
      window.removeEventListener("click", closeContextMenu);
      window.removeEventListener("contextmenu", closeContextMenu);
    };
  }, [isContextMenuVisible]);

  return (
    <>
      {isContextMenuVisible && (
        <BookmarkContextMenu
          top={contextMenuPosition.top}
          left={contextMenuPosition.left}
          onClose={closeContextMenu}
          onAction={handleContextMenuAction}
          bookmarkId={bookmarkId}
          handleRefetch={handleRefetch}
        />
      )}
      <Draggable key={bookmarkId} draggableId={dragId} index={1}>
        {(provided) => (
          <div
            title={url}
            className={`transform bg-white border-2 rounded-md shadow-md w-72 h-80 
              ${
                isHover &&
                `transition-transform scale-105 border border-gray-300 shadow-lg z-30 flex flex-col h-auto min-h-[20rem]`
              }`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onClickHandler}
            onContextMenu={handleContextMenu}
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
                title={description}
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
              {/*<span className="inline-block w-[20%]"></span>*/}
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;
