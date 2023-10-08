/**
 * 사이드바에서 사용되는 타일 컴포넌트
 * @param {string, object, string, bool} param0
 * @returns
 */
const SidebarTile = ({ className, src, alt, padding = true }) => {
  return (
    <div
      className={`${
        padding && "p-[10px]"
      } w-[60px] h-[60px] ml-[-1px] border-t border-[#c6c6c6] cursor-pointer`}
    >
      <img className="w-full h-full" src={src} alt={alt} />
    </div>
  );
};

export default SidebarTile;
