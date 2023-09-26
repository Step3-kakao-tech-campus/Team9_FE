import Tag from "../atoms/Tag";

/**
 * 카드 컴포넌트
 * @param {string} imageUrl - 사진 URL
 * @param {string} imageAlt - 사진 대체 텍스트
 * @param {string} title - 북마크 제목
 * @param {string} description - 북마크 설명
 * @param {array<string>} tags - 태그 명 배열
 */
const Card = ({ imageUrl, imageAlt, title, description, tags }) => {
  return (
    <div className="w-72 h-80 border-2 bg-white shadow-md rounded-md">
        {/* 이미지 영역 */}
        <img src={imageUrl} alt={imageAlt} className="w-64 h-40 object-cover mx-auto my-1 rounded-sm" />

        {/* 내용 영역 */}
        <div className="px-4 py-4">
            <div className="font-bold text-xl mb-2 text-ellipsis overflow-hidden">{title}</div>
            <p className="text-gray-700 text-base text-ellipsis overflow-hidden">{description}</p>
        </div>

        {/* 꼬리 영역 */}
        <div className="px-2 py-2">
            {/* 태그 영역 */}
            <span className="inline-block w-[80%]">
                {tags.map((tag, index) => (
                    <Tag key={index} name={tag} />
                ))}
            </span>
            {/* 버튼 영역 */}
            <span className="inline-block w-[20%]">
                
            </span>
        </div>
    </div>
  );
}

export default Card;