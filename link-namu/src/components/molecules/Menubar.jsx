import WorkspaceItem from "../atoms/WorkspaceItem";

const Menubar = () => {
  const data = [
    {
      workspaceId: 1,
      workspaceName: "나의 워크스페이스",
      categoryList: [
        {
          categoryId: 1,
          categoryName: "카테고리 1",
        },
        {
          categoryId: 2,
          categoryName: "카테고리 2",
        },
      ],
    },
    {
      workspaceId: 2,
      workspaceName: "나의 워크스페이스2",
      categoryList: [
        {
          categoryId: 3,
          categoryName: "카테고리 3",
        },
        {
          categoryId: 4,
          categoryName: "카테고리 4",
        },
      ],
    },
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
            {data.map((workspace, index) => {
              return (
                <WorkspaceItem
                  key={index}
                  workspaceId={workspace.workspaceId}
                  workspaceName={workspace.workspaceName}
                  categories={workspace.categoryList}
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
