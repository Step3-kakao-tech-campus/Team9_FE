import MainCategoryItem from "../atoms/MainCategoryItem";

const Menubar = () => {
  return (
    <div className="w-[256px] h-screen fixed left-0 flex flex-col border border-[#d9d9d9] bg-white rounded-r-lg">
      <div className="p-6 border-b border-[#d9d9d9] text-center">
        <span className="text-base font-medium">🎄 LinkNamu</span>
      </div>
      <div className="flex-grow p-6">
        <span
          className={"text-[#5c5e64] text-[10px] font-medium leading-3 pl-3"}
        >
          MAIN
        </span>
        <div>
          <MainCategoryItem title="카테고리1" />
          <MainCategoryItem title="카테고리2" />
          <MainCategoryItem title="카테고리3" />
          <MainCategoryItem title="카테고리4" />
        </div>
      </div>
      <div className="">
        <button className="block w-[190px] h-[36px] mx-auto my-5 border border-[#d9d9d9] rounded-md">
          카테고리 추가
        </button>
      </div>
    </div>
  );
};

export default Menubar;
