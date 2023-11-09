/**
 * 카드 꼬리 영역에 사용할 태그 컴포넌트
 * @param {string} name - 태그 명
 */
const Tag = ({ name }) => {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 text-ellipsis overflow-hidden max-w-[80%] break-all whitespace-nowrap">
      {name}
    </span>
  )
}

export default Tag
