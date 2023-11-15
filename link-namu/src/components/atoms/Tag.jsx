/**
 * 카드 꼬리 영역에 사용할 태그 컴포넌트
 * @param {string} name - 태그 명
 */
const Tag = ({ name, isHover = false }) => {
  return (
    <span
      title={name}
      className={`block border border-gray-100 bg-gray-100 rounded-full px-2 py-1 text-sm font-semibold text-gray-500 mr-2 text-ellipsis overflow-hidden max-w-[80%] break-all whitespace-nowrap
      ${
        isHover &&
        `overflow-normal text-clip whitespace-normal min-w-fit flex flex-wrap`
      }`}
    >
      {name}
    </span>
  );
};

export default Tag;
