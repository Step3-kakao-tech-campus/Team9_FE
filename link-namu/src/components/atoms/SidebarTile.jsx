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
