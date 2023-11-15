/**
 * 사이드바에서 사용되는 타일 컴포넌트
 * @param {object} src - 이미지 객체
 * @param {string} alt - 대체 텍스트
 * @param {bool} padding - 패딩 여부
 * @returns
 */
const SidebarTile = ({ src, alt, title, padding = true, onClick }) => {
  return (
    <button
      title={title}
      className={`${
        padding && "p-[10px]"
      } w-[60px] h-[60px] ml-[-1px] border-t border-[#c6c6c6]`}
      onClick={onClick}
    >
      <img className="w-full h-full hover:opacity-50" src={src} alt={alt} />
    </button>
  );
};

export default SidebarTile;
