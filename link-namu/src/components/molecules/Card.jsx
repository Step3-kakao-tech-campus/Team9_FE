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
  const [isDragging, setIsDragging] = useState(false);
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleContextMenu = event => {
    event.preventDefault();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    setContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleContextMenuAction = action => {
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
        {provided => (
          <div
            className={`transform bg-white border-2 rounded-md shadow-md w-72 h-80 hover:transition-transform hover:scale-105 hover:border hover:border-gray-300 hover:shadow-lg`}
            onMouseEnter={() => setIsDragging(true)}
            onMouseLeave={() => setIsDragging(false)}
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
              className="object-contain w-64 h-40 mx-auto my-1 rounded-sm"
            />

            {/* 내용 영역 */}
            <div className="px-4 py-4">
              <div className="mb-2 overflow-hidden text-xl font-bold break-all text-ellipsis whitespace-nowrap">
                {title}
              </div>
              <p className="overflow-hidden text-sm text-gray-700 break-all text-ellipsis whitespace-normal">
                <div className="line-clamp-2">{description}</div>
              </p>
            </div>

            {/* 꼬리 영역 */}
            <div className="px-2 py-2 overflow-hidden w-[90%]">
              {/* 태그 영역 */}
              <span className="flex w-full">
                {tags.map((tag, index) => (
                  <Tag key={index} name={tag.tagName} />
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
