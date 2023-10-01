import MainCategoryItem from "../atoms/MainCategoryItem";

const Menubar = () => {
  const MainCategories = [
    {
      title: "카테고리1",
      subCategories: [{ title: "카테고리1-1" }, { title: "카테고리1-2" }],
    },
    { title: "카테고리2", subCategories: [{ title: "카테고리2-1" }] },
    {
      title: "카테고리3",
      subCategories: [
        {
          title: "카테고리3-1",
          subCategories: [
            { title: "카테고리3-1-1" },
            { title: "카테고리3-1-2" },
            { title: "카테고리3-1-3" },
          ],
        },
        { title: "카테고리3-2" },
        { title: "카테고리3-3" },
        { title: "카테고리3-4" },
      ],
    },
    { title: "카테고리4" },
  ];

  return (
    <>
      <div className="w-[256px] h-screen fixed left-0 top-0 flex flex-col border border-[#d9d9d9] bg-white rounded-r-lg">
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
            {MainCategories.map((category, index) => {
              return (
                <MainCategoryItem
                  key={index}
                  title={category.title}
                  subCategories={category.subCategories}
                />
              );
            })}
          </div>
        </div>
        <div className="">
          <button className="block w-[190px] h-[36px] mx-auto my-5 border border-[#d9d9d9] rounded-md">
            카테고리 추가
          </button>
        </div>
      </div>
    </>
  );
};

export default Menubar;
