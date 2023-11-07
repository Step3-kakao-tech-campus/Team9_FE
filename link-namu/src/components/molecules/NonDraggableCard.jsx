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
  const onClickHandler = () => {
    window.open(url);
  };
  return (
    <div
      className="bg-white border-2 rounded-md shadow-md w-72 h-80 cursor-pointer"
      onClick={onClickHandler}
    >
      {/* 이미지 영역 */}
      <img
        src={imageUrl}
        alt={imageAlt}
        className="object-cover w-64 h-40 mx-auto my-1 rounded-sm"
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
  );
};

export default NonDraggableCard;
